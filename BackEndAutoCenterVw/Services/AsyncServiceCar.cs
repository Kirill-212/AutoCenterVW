using AutoMapper;
using Contracts;
using Domain.Exceptions;
using Domain.FilterHelper;
using Domain.Models;
using Domain.Models.CarEquipment;
using Domain.Pagination;
using Domain.Repositories;
using Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Services
{
    internal sealed class AsyncServiceCar :
        IAsyncServiceCar<Car, ImgCar, GetCarDto, FilterCarEmail,FilterCar>
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IAsyncRepositoryCarEquipment<CarEquipment> asyncRepositoryCarEquipment;
        public AsyncServiceCar(
           IUnitOfWork unitOfWork,
            IAsyncRepositoryCarEquipment<CarEquipment> asyncRepositoryCarEquipment

            )
        {
            this.asyncRepositoryCarEquipment = asyncRepositoryCarEquipment;
            this.unitOfWork = unitOfWork;
        }

        public async Task Create(
            Car item,
            List<ImgCar> imgCar,
            int? sharePercentage,
            string nameCarEquipment,
            CancellationToken cancellationToken = default
            )
        {
            CarEquipment carEquipment = asyncRepositoryCarEquipment
                .GetByName(nameCarEquipment);
            if (carEquipment == null)
                throw new CarEquipmentNotFound(nameCarEquipment);
            Car car =
                await unitOfWork.AsyncRepositoryCar.GetByVin(item.VIN);
            if (car != null)
                throw new CarVinFound(item.VIN);
            if (sharePercentage != null)
            {
                ActionCar actionCar =
                    await unitOfWork.AsyncRepositoryActionCar
                    .GetBySharePercentage((int)sharePercentage);
                if (actionCar == null)
                {
                    actionCar = new() { SharePercentage = (int)sharePercentage };
                    await unitOfWork.AsyncRepositoryActionCar.Create(actionCar);
                    await unitOfWork.CompleteAsync();
                    actionCar = await unitOfWork.AsyncRepositoryActionCar
                        .GetBySharePercentage((int)sharePercentage);
                    item.ActionCarId = actionCar.Id;
                }
                else
                {
                    item.ActionCarId = actionCar.Id;
                }
            }
            item.IdCarEquipment = carEquipment.Id;
            item.IsActive = false;
            item.IsDeleted = false;
            item.ImgsCar = imgCar;
            await unitOfWork.AsyncRepositoryCar.Create(item);
            await unitOfWork.CompleteAsync();
        }

        public async Task<IEnumerable<Car>> GetAll(CancellationToken cancellationToken = default)
        {
            return await unitOfWork.AsyncRepositoryCar.Get();
        }

        public PagedListCar<GetCarDto> GetAllPaged(PagedParameters item, FilterCar filterAllCar, IMapper mapper)
        {
            IQueryable<Car> items = unitOfWork.AsyncRepositoryCar.GetPaged().OrderBy(on => on.Id);
            List<GetCarDto> carsDto = new();
            foreach (Car i in items)
            {
                CarEquipment carEquipment = asyncRepositoryCarEquipment.GetById(i.IdCarEquipment);
                decimal totalCost = i.Cost + carEquipment.Equipments.Select(i => i.EquipmentItem.Cost).Sum();
                if (i.ActionCar != null) totalCost =
                        (decimal)(Convert.ToDouble(totalCost) *
                        (100 - (double)i.ActionCar.SharePercentage) / 100.0);
                carsDto.Add(new GetCarDto()
                {
                    Car = i,
                    TotalCost = totalCost,
                    User = i.ClientCar?.User,
                });
            };
            carsDto = FilteringCar(carsDto, filterAllCar);
            carsDto = carsDto.Skip((item.PageNumber - 1) * item.PageSize).Take(item.PageSize).ToList();
            return PagedListCar<GetCarDto>.ToPagedList(items.Count(), carsDto,
        item.PageNumber,
        item.PageSize);
        }

        public async Task<Car> GetById(int id, CancellationToken cancellationToken = default)
        {
            return await unitOfWork.AsyncRepositoryCar.GetById(id);
        }

        public async Task<Car> GetByVin(string vin, CancellationToken cancellationToken = default)
        {
            return await unitOfWork.AsyncRepositoryCar.GetByVin(vin);
        }

        public async Task<IEnumerable<Car>> GetCarActive()
        {
            return await unitOfWork.AsyncRepositoryCar.GetCarActive();
        }

        public PagedListCar<GetCarDto> GetByEmailPaged(PagedParameters item, string email,FilterCarEmail filter, IMapper mapper)
        {
            IQueryable<Car> carItems = unitOfWork.AsyncRepositoryCar.GetByEmailPaged(email).OrderBy(on => on.Id);
            List<GetCarDto> carsDto = new();
            foreach (Car i in carItems)
            {
                CarEquipment carEquipment = asyncRepositoryCarEquipment.GetById(i.IdCarEquipment);
                decimal totalCost = i.Cost + carEquipment.Equipments.Select(i => i.EquipmentItem.Cost).Sum();
                if (i.ActionCar != null) totalCost =
                        (decimal)(Convert.ToDouble(totalCost) *
                        (100 - (double)i.ActionCar.SharePercentage) / 100.0);
                carsDto.Add(new GetCarDto()
                {
                    Car = i,
                    TotalCost = totalCost,
                    User = i.ClientCar.User
                });
            };
            carsDto= FilteringClientCar(carsDto,filter);
            carsDto = carsDto.Skip((item.PageNumber - 1) * item.PageSize).Take(item.PageSize).ToList();
            return PagedListCar<GetCarDto>.ToPagedList(carItems.Count(), carsDto,
        item.PageNumber,
        item.PageSize);
        }

        public async Task<IEnumerable<Car>> GetCarForUser(CancellationToken cancellationToken = default)
        {
            return await unitOfWork.AsyncRepositoryCar.GetCarForUser();
        }

        public async Task<IEnumerable<Car>> GetWithoutClientCar(CancellationToken cancellationToken = default)
        {
            return await unitOfWork.AsyncRepositoryCar.GetWithoutClientCar();
        }

        public async Task Remove(
            string vin,
            CancellationToken cancellationToken = default
            )
        {
            Car car = await unitOfWork.AsyncRepositoryCar.GetByVin(vin);
            if (car == null)
                throw new CarVinFound(vin, "not found");
            car.IsDeleted = true;
            unitOfWork.AsyncRepositoryCar.Update(car);
            IEnumerable<TestDrive> testDrives = await unitOfWork.AsyncRepositoryTestDrive.GetByVin(vin);
            foreach (var i in testDrives)
                i.stateTestDrive = StateTestDrive.CANCEL;
            IEnumerable<CarRepair> carRepairs = await unitOfWork.AsyncRepositoryCarRepair.GetByVin(vin);
            foreach (var i in carRepairs)
                i.StateCarRepair = StateCarRepair.CANCEL;
            IEnumerable<Order> order = await unitOfWork.AsyncRepositoryOrder.GetByVin(vin);
            foreach (var i in order)
                i.State = State.CANCEL;
            unitOfWork.AsyncRepositoryOrder.UpdateRange(order);
            unitOfWork.AsyncRepositoryTestDrive.UpdateRange(testDrives);
            unitOfWork.AsyncRepositoryCarRepair.UpdateRange(carRepairs);
            unitOfWork.AsyncRepositoryCar.Update(car);
            await unitOfWork.CompleteAsync();
        }

        public async Task Update(
            Car item,
            int? sharePercentage,
            string nameCarEquipment = null,
            string newVin = null,
            CancellationToken cancellationToken = default
            )
        {

            Car car = await unitOfWork.AsyncRepositoryCar.GetByVin(item.VIN);
            if (car == null)
                throw new CarVinFound(item.VIN, "not found");
            if ((car.ActionCar == null && sharePercentage != null) ||
                (sharePercentage != null && car.ActionCar != null &&
                sharePercentage != car.ActionCar.SharePercentage))
            {
                ActionCar actionCar = await unitOfWork.AsyncRepositoryActionCar
                   .GetBySharePercentage((int)sharePercentage);
                if (actionCar == null)
                {
                    actionCar = new() { SharePercentage = (int)sharePercentage };
                    await unitOfWork.AsyncRepositoryActionCar.Create(actionCar);
                    await unitOfWork.CompleteAsync();
                    actionCar = await unitOfWork.AsyncRepositoryActionCar
                        .GetBySharePercentage((int)sharePercentage);
                    car.ActionCarId = actionCar.Id;
                }
                else
                {
                    car.ActionCarId = actionCar.Id;
                }
            }
            else if (sharePercentage == null && car.ActionCar != null) car.ActionCarId = null;
            if (nameCarEquipment != null)
            {
                CarEquipment carEquipment =
                    asyncRepositoryCarEquipment.GetByName(nameCarEquipment);
                if (carEquipment == null)
                    throw new CarEquipmentNotFound(nameCarEquipment);
                car.IdCarEquipment = carEquipment.Id;
            }
            if (newVin != null)
            {
                Car carNewVin = await unitOfWork.AsyncRepositoryCar.GetByVin(newVin);
                if (carNewVin != null)
                {
                    throw new CarVinFound(newVin);
                }
                else
                {
                    car.VIN = newVin;
                }
            }
            var urlImgsForm = item.ImgsCar.Select(i => i.Url);
            var urlImgsDb = car.ImgsCar.Select(i => i.Url);
            List<ImgCar> removeImgs = car.ImgsCar
                .Where(i => urlImgsDb.Except(urlImgsForm)
                .Contains(i.Url))
                .ToList();
            List<ImgCar> addImgs = item.ImgsCar
                .Where(i => urlImgsForm.Except(urlImgsDb).Contains(i.Url))
                .Select(i => new ImgCar { Url = i.Url, CarId = car.Id })
                .ToList();
            if (addImgs.Count != 0)
            {
                await unitOfWork.AsyncRepositoryImgCar.AddRange(addImgs);
                await unitOfWork.CompleteAsync();
            }
            if (removeImgs.Count != 0)
            {
                unitOfWork.AsyncRepositoryImgCar.DeleteRange(removeImgs);
                await unitOfWork.CompleteAsync();
            }
            car.DateOfRealeseCar = item.DateOfRealeseCar;
            car.CarMileage = item.CarMileage;
            car.Cost = item.Cost;
            unitOfWork.AsyncRepositoryCar.Update(car);
            await unitOfWork.CompleteAsync();
        }

        public async Task UpdateStatus(string vin, CancellationToken cancellationToken = default)
        {
            Car car = await unitOfWork.AsyncRepositoryCar.GetByVin(vin);
            if (car == null)
                throw new CarVinFound(vin, "not found");
            if (car.ClientCar != null)
            {
                if (car.IsActive)
                {
                    IEnumerable<Order> order = await unitOfWork.AsyncRepositoryOrder.GetByVin(vin);
                    if (order.Count() > 0)
                        throw new UpdateStatusIsActiveOrder();
                }
                else
                {
                    IEnumerable<CarRepair> carRepairs = await unitOfWork.AsyncRepositoryCarRepair.GetByVin(vin);
                    if (carRepairs.Count() > 0)
                        throw new UpdateStatusIsActiveCarRepair();
                }
            }
            else
            {
                if (car.IsActive)
                {
                    IEnumerable<Order> order = await unitOfWork.AsyncRepositoryOrder.GetByVin(vin);
                    if (order.Count() > 0)
                        throw new UpdateStatusIsActiveOrder();
                }
                else
                {
                    IEnumerable<TestDrive> testDrives = await unitOfWork.AsyncRepositoryTestDrive.GetByVin(vin);
                    if (testDrives.Count() > 0)
                        throw new UpdateStatusIsActiveTestDrive();
                }
            }
            car.IsActive = !car.IsActive;
            unitOfWork.AsyncRepositoryCar.Update(car);
            await unitOfWork.CompleteAsync();
        }

        public async Task<IEnumerable<Car>> GetCarByEmail(string email, CancellationToken cancellationToken = default)
        {
            return await unitOfWork.AsyncRepositoryCar.GetCarByEmail(email);
        }

        public async Task Remove(string vin, string email, CancellationToken cancellationToken = default)
        {
            Car car = await unitOfWork.AsyncRepositoryCar.GetCarByVinAndEmailForOrder(vin, email);
            if (car == null)
                throw new CarVinWithEmailFound(vin, email, "not found");
            car.IsDeleted = true;
            unitOfWork.AsyncRepositoryCar.Update(car);
            IEnumerable<TestDrive> testDrives = await unitOfWork.AsyncRepositoryTestDrive.GetByVin(vin);
            foreach (var i in testDrives)
                i.stateTestDrive = StateTestDrive.CANCEL;
            IEnumerable<CarRepair> carRepairs = await unitOfWork.AsyncRepositoryCarRepair.GetByVin(vin);
            foreach (var i in carRepairs)
                i.StateCarRepair = StateCarRepair.CANCEL;
            IEnumerable<Order> order = await unitOfWork.AsyncRepositoryOrder.GetByVin(vin);
            foreach (var i in order)
                i.State = State.CANCEL;
            unitOfWork.AsyncRepositoryOrder.UpdateRange(order);
            unitOfWork.AsyncRepositoryTestDrive.UpdateRange(testDrives);
            unitOfWork.AsyncRepositoryCarRepair.UpdateRange(carRepairs);
            unitOfWork.AsyncRepositoryCar.Update(car);
            await unitOfWork.CompleteAsync();
        }

        public List<GetCarDto> FilteringClientCar(List<GetCarDto> data, FilterCarEmail filter)
        {
            if (!String.IsNullOrEmpty(filter.Vin))
            {
                data = data.Where(i => i.Car.VIN.Contains(filter.Vin)).ToList();
            }
            if (filter.DateOfRealeseCarFrom != null && filter.DateOfRealeseCarBefore != null)
            {
                data = data
                    .Where(i =>
                    i.Car.DateOfRealeseCar < filter.DateOfRealeseCarBefore
                    &&
                    i.Car.DateOfRealeseCar > filter.DateOfRealeseCarFrom)
                    .ToList();
            }
           else if (filter.DateOfRealeseCarFrom == null && filter.DateOfRealeseCarBefore != null)
            {
                data = data
                    .Where(i =>
                    i.Car.DateOfRealeseCar < filter.DateOfRealeseCarBefore).ToList();
            }
            else if (filter.DateOfRealeseCarFrom != null && filter.DateOfRealeseCarBefore == null)
            {
                data = data
                    .Where(i =>
                    i.Car.DateOfRealeseCar > filter.DateOfRealeseCarFrom).ToList();
            }
            if (filter.TotalCostFrom != null && filter.TotalCostBefore != null)
            {
                data = data
                    .Where(i => i.TotalCost > filter.TotalCostFrom && i.TotalCost < filter.TotalCostBefore)
                    .ToList();
            }
            else if (filter.TotalCostBefore != null && filter.TotalCostFrom == null)
            {
                data = data.Where(i => i.TotalCost < filter.TotalCostBefore).ToList();
            }
            else if (filter.TotalCostFrom != null && filter.TotalCostBefore == null)
            {
                data = data.Where(i => i.TotalCost > filter.TotalCostFrom).ToList();
            }

            if (filter.CarMileageFrom != null && filter.CarMileageBefore != null)
            {
                data = data
                    .Where(i => i.Car.CarMileage > filter.CarMileageFrom && i.Car.CarMileage < filter.CarMileageBefore)
                    .ToList();
            }
            else if (filter.CarMileageBefore != null && filter.CarMileageFrom == null)
            {
                data = data.Where(i => i.Car.CarMileage < filter.CarMileageBefore).ToList();
            }
            else if (filter.CarMileageFrom != null && filter.CarMileageBefore == null)
            {
                data = data.Where(i => i.Car.CarMileage > filter.CarMileageFrom).ToList();
            }
            if (filter.Cell==StateCell.SELL)
            {
                data = data.Where(i => i.Car.IsActive ==true).ToList();
            }
            else if (filter.Cell == StateCell.NOT_SELL)
            {
                data = data.Where(i => i.Car.IsActive == false).ToList();
            }

            return data;
        }

        public List<GetCarDto> FilteringCar(List<GetCarDto> data, FilterCar filter)
        {
            data = FilteringClientCar(data, filter);

            if (filter.FilterAllCar == CarFilter.ClientCar)
            {
                data = data.Where(i => i.Car.ClientCar != null).ToList();
            }
            else
            if (filter.FilterAllCar == CarFilter.CarAutoCenter)
            {
                data = data.Where(i => i.Car.ClientCar == null).ToList();
            }

            return data;
        }
    }
}
