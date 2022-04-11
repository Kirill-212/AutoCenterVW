using AutoMapper;
using Contracts;
using Domain.Exceptions;
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
        IAsyncServiceCar<Car, ImgCar,GetCarDto>
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

        public PagedList<Car, GetCarDto> GetAllPaged(PagedParameters item, IMapper mapper)
        {
            return PagedList<Car, GetCarDto>.ToPagedList(unitOfWork.AsyncRepositoryCar.GetPaged().OrderBy(on => on.Id),
        item.PageNumber,
        item.PageSize, mapper);
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

        public PagedList<Car, GetCarDto> GetByEmailPaged(PagedParameters item, string email, IMapper mapper)
        {
            return PagedList<Car, GetCarDto>.ToPagedList(unitOfWork.AsyncRepositoryCar.GetByEmailPaged(email).OrderBy(on => on.Id),
        item.PageNumber,
        item.PageSize, mapper);
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
            car.IsActive = !car.IsActive;
            unitOfWork.AsyncRepositoryCar.Update(car);
            await unitOfWork.CompleteAsync();
        }

        public async Task<IEnumerable<Car>> GetCarByEmail(string email, CancellationToken cancellationToken = default)
        {
            return await unitOfWork.AsyncRepositoryCar.GetCarByEmail(email);
        }
    }
}
