using Domain.Exceptions;
using Domain.Models;
using Domain.Models.CarEquipment;
using Domain.Repositories;
using Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Services
{
    internal sealed class AsyncServiceClientCar : IAsyncServiceClientCar<ClientCar>
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IAsyncRepositoryCarEquipment<CarEquipment> asyncRepositoryCarEquipment;
        public AsyncServiceClientCar(
           IUnitOfWork unitOfWork,
            IAsyncRepositoryCarEquipment<CarEquipment> asyncRepositoryCarEquipment
            )
        {
            this.asyncRepositoryCarEquipment = asyncRepositoryCarEquipment;
            this.unitOfWork = unitOfWork;
        }

        public async Task Create(
            ClientCar item,
            string email,
            int? sharePercentage,
            string nameCarEquipment,
            CancellationToken cancellationToken = default
            )
        {
            CarEquipment carEquipment = asyncRepositoryCarEquipment.GetByName(nameCarEquipment);
            if (carEquipment == null)
                throw new CarEquipmentNotFound(nameCarEquipment);
            User user = await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(email);
            if (user == null)
                throw new UserStatusIsNotValid(email);
            Car car = await unitOfWork.AsyncRepositoryCar.GetByVin(item.Car.VIN);
            if (car != null)
                throw new CarVinFound(item.Car.VIN);
            if (item.RegisterNumber != null)
            {
                ClientCar clientCar =
                    await unitOfWork.AsyncRepositoryClientCar.GetByRegisterNumber(item.RegisterNumber);
                if (clientCar != null)
                    throw new ClientCarRegisterNumberFound(item.RegisterNumber);
            }
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
                    item.Car.ActionCarId = actionCar.Id;
                }
                else
                {
                    item.Car.ActionCarId = actionCar.Id;
                }
            }
            item.Car.IsActive = false;
            item.Car.IsDeleted = false;
            item.Car.IdCarEquipment = carEquipment.Id;
            //item.Car.ImgsCar = imgCar;
            await unitOfWork.AsyncRepositoryCar.Create(item.Car);
            await unitOfWork.CompleteAsync();
            item.CarId = (await unitOfWork.AsyncRepositoryCar.GetByVin(item.Car.VIN)).Id;
            item.UserId = user.Id;
            await unitOfWork.AsyncRepositoryClientCar.Create(item);
            await unitOfWork.CompleteAsync();
        }

        public async Task<IEnumerable<ClientCar>> GetAll(CancellationToken cancellationToken = default)
        {
            return await unitOfWork.AsyncRepositoryClientCar.Get();
        }

        public async Task<ClientCar> GetByEmailWithVin(string email, string vin, CancellationToken cancellationToken = default)
        {
            return await unitOfWork.
                 AsyncRepositoryClientCar.GetCarByCarVinWithEmail(vin, email);
        }

        public async Task<ClientCar> GetById(
            int id, CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryClientCar.GetById(id);
        }

        public async Task<ClientCar> GetCarByVin(string vin)
        {
            return await unitOfWork.AsyncRepositoryClientCar.GetCarByVin(vin);
        }

        public async Task Remove(
            string registerNumber,
            CancellationToken cancellationToken = default
            )
        {
            ClientCar clientCar = await unitOfWork.AsyncRepositoryClientCar.GetByRegisterNumber(registerNumber);
            if (clientCar == null) throw new ClientCarRegisterNumberFound(registerNumber, "not found");
            clientCar.Car.IsDeleted = true;
            IEnumerable<TestDrive> testDrives = await unitOfWork.AsyncRepositoryTestDrive.GetByVin(clientCar.Car.VIN);
            foreach (var i in testDrives)
                i.stateTestDrive = StateTestDrive.CANCEL;
            IEnumerable<CarRepair> carRepairs = await unitOfWork.AsyncRepositoryCarRepair.GetByVin(clientCar.Car.VIN);
            foreach (var i in carRepairs)
                i.StateCarRepair = StateCarRepair.CANCEL;
            IEnumerable<Order> order = await unitOfWork.AsyncRepositoryOrder.GetByVin(clientCar.Car.VIN);
            foreach (var i in order)
                i.State = State.CANCEL;
            unitOfWork.AsyncRepositoryOrder.UpdateRange(order);
            unitOfWork.AsyncRepositoryTestDrive.UpdateRange(testDrives);
            unitOfWork.AsyncRepositoryCarRepair.UpdateRange(carRepairs);
            unitOfWork.AsyncRepositoryCar.Update(clientCar.Car);
            await unitOfWork.CompleteAsync();
        }

        public async Task Update(
            ClientCar item,
            int? sharePercentage,
            string oldEmail,
            string newEmail,
            string newRegisterNumber,
            string nameCarEquipment = null,
            bool changeRegisterNumber = false,
            string newVin = null,
            CancellationToken cancellationToken = default
            )
        {
            User user =
                await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(oldEmail);
            if (user == null)
                throw new UserStatusIsNotValid(oldEmail);
            ClientCar clientCar =
                await unitOfWork.AsyncRepositoryClientCar.GetCarByCarVinWithEmail(item.Car.VIN, oldEmail);
            if (clientCar == null)
                throw new CarVinWithEmailFound(item.Car.VIN, oldEmail, "not found");
            if (changeRegisterNumber)
            {
                if (newRegisterNumber != null)
                {
                    ClientCar clientCarRegisterNumber =
                        await unitOfWork.AsyncRepositoryClientCar.GetByRegisterNumber(newRegisterNumber);
                    if (clientCarRegisterNumber != null)
                        throw new ClientCarRegisterNumberFound(newRegisterNumber);
                    clientCar.RegisterNumber = newRegisterNumber;
                }
                else
                {
                    clientCar.RegisterNumber = null;
                }
            }
            if (newEmail != null)
            {
                user = await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(newEmail);
                if (user == null) throw new UserStatusIsNotValid(newEmail);
                clientCar.UserId = user.Id;
            }
            if (
                (clientCar.Car.ActionCar == null && sharePercentage != null)
                || (
                sharePercentage != null && clientCar.Car.ActionCar != null
                && sharePercentage != clientCar.Car.ActionCar.SharePercentage
                )
                )
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
                    clientCar.Car.ActionCarId = actionCar.Id;
                }
                else
                {
                    clientCar.Car.ActionCarId = actionCar.Id;
                }
            }
            else if (sharePercentage == null && clientCar.Car.ActionCar != null)
                clientCar.Car.ActionCarId = null;
            if (nameCarEquipment != null)
            {
                CarEquipment carEquipment =
                    asyncRepositoryCarEquipment.GetByName(nameCarEquipment);
                if (carEquipment == null)
                    throw new CarEquipmentNotFound(nameCarEquipment);
                clientCar.Car.IdCarEquipment = carEquipment.Id;
            }
            if (newVin != null)
            {
                Car carNewVin =
                    await unitOfWork.AsyncRepositoryCar.GetByVin(newVin);
                if (carNewVin != null)
                {
                    throw new CarVinFound(newVin);
                }
                else
                {
                    clientCar.Car.VIN = newVin;
                }
            }
            var urlImgsForm = item.Car.ImgsCar.Select(i => i.Url);
            var urlImgsDb = clientCar.Car.ImgsCar.Select(i => i.Url);
            List<ImgCar> removeImgs = clientCar.Car.ImgsCar
                .Where(i => urlImgsDb.Except(urlImgsForm)
                .Contains(i.Url))
                .ToList();
            List<ImgCar> addImgs = item.Car.ImgsCar
                .Where(i => urlImgsForm.Except(urlImgsDb).Contains(i.Url))
                .Select(i => new ImgCar { Url = i.Url, CarId = clientCar.Car.Id })
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
            clientCar.Car.DateOfRealeseCar = item.Car.DateOfRealeseCar;
            clientCar.Car.CarMileage = item.Car.CarMileage;
            clientCar.Car.Cost = item.Car.Cost;
            unitOfWork.AsyncRepositoryCar.Update(clientCar.Car);
            await unitOfWork.CompleteAsync();
            unitOfWork.AsyncRepositoryClientCar.Update(clientCar);
            await unitOfWork.CompleteAsync();
        }

        public async Task UpdateForUser(ClientCar item, int? sharePercentage, string oldEmail, string newEmail, string newRegisterNumber, string email, string nameCarEquipment = null, bool changeRegisterNumber = false, string newVin = null, CancellationToken cancellationToken = default)
        {
            Car car = await unitOfWork.AsyncRepositoryCar.GetCarByVinAndEmailForOrder(item.Car.VIN, email);
            if (car == null)
                throw new CarVinWithEmailFound(item.Car.VIN,email, "not found");
            await Update(
             item,
           sharePercentage,
            oldEmail,
            newEmail,
            newRegisterNumber,
            nameCarEquipment ,
            changeRegisterNumber,
            newVin
              );
        }
    }
}
