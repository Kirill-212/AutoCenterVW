using Contracts;
using Domain.Exceptions;
using Domain.HttpClent;
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
    internal sealed class AsyncServiceOrder : IAsyncServiceOrder<Order>
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IAsyncRepositoryCarEquipment<CarEquipment> asyncRepositoryCarEquipment;
        private readonly IAsynHttpClient<PayDataDto> asynHttpClient;

        public AsyncServiceOrder(
           IUnitOfWork unitOfWork,
           IAsyncRepositoryCarEquipment<CarEquipment> asyncRepositoryCarEquipment,
           IAsynHttpClient<PayDataDto> asynHttpClient
            )
        {
            this.asynHttpClient = asynHttpClient;
            this.asyncRepositoryCarEquipment = asyncRepositoryCarEquipment;
            this.unitOfWork = unitOfWork;
        }

        public async Task Create(
            bool changeRegisterNumber,
            string vin,
            string emailOwner,
            string emailBuyer,
            CancellationToken cancellationToken = default
            )
        {
            Car car;
            if (emailOwner == null)
            {
                car = await unitOfWork.AsyncRepositoryCar.GetCarByVinForOrder(vin);
                if (car == null || car.IsActive == false)
                    throw new CarVinError(vin);
            }
            else
            {
                car = await unitOfWork.AsyncRepositoryCar.GetCarByVinForOrder(vin);
                if (car == null || car.IsActive == false)
                    throw new CarVinWithEmailFound(vin, emailOwner, "not found or status car is not active");
            }
            User user = await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(emailBuyer);
            if (user == null)
                throw new UserStatusIsNotValidOrUserNotFound(emailBuyer);
            CarEquipment carEquipment = asyncRepositoryCarEquipment.GetById(car.IdCarEquipment);
            decimal totalCost = car.Cost + carEquipment.Equipments.Select(i => i.EquipmentItem.Cost).Sum();
            if (car.ActionCar != null) totalCost =
                    (decimal)(Convert.ToDouble(totalCost) *
                    (100 - (double)car.ActionCar.SharePercentage) / 100.0);
            Order order = new
            ()
            {
                CarId = car.Id,
                TotalCost = totalCost,
                State = State.PENDING,
                UserId = user.Id,
                ChangeRegisterNumber = changeRegisterNumber
            };
            Order checkOrder = await unitOfWork.AsyncRepositoryOrder.GetByOrderParams(order);
            if (
                checkOrder != null &&
                (checkOrder.State != State.PAID && checkOrder.State != State.CANCEL)
                )
                throw new OrderAlredyAdded(checkOrder.State.ToString());
            await unitOfWork.AsyncRepositoryOrder.Create(order);
            await unitOfWork.CompleteAsync();
        }

        public async Task<IEnumerable<Order>> GetForBuyer(
            string email,
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryOrder.GetForBuyer(email);
        }

        public async Task<IEnumerable<Order>> GetForEmployee(CancellationToken cancellationToken = default)
        {
            return await unitOfWork.AsyncRepositoryOrder.GetForEmployee();
        }

        public async Task<IEnumerable<Order>> GetForUser(
            string email,
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryOrder.GetForUser(email);
        }

        public async Task UpdateStateForCancel(
            string vin,
            string emailBuyer,
            decimal totalCost,
            CancellationToken cancellationToken = default
            )
        {
            Car car = await unitOfWork.AsyncRepositoryCar.GetCarByVinForOrder(vin);
            if (car == null || car.IsActive == false)
                throw new CarVinError(vin);
            User user = await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(emailBuyer);
            if (user == null)
                throw new UserStatusIsNotValidOrUserNotFound(emailBuyer);
            Order order = new
            ()
            {
                CarId = car.Id,
                TotalCost = totalCost,
                UserId = user.Id,
            };
            order = await unitOfWork.AsyncRepositoryOrder.GetByOrderParams(order);
            if (order == null) throw new OrderNotFound();
            if (order != null && order.State == State.PAID)
                throw new OrderErrorUpdateState(order.State.ToString());
            order.State = State.CANCEL;
            unitOfWork.AsyncRepositoryOrder.Update(order);
            await unitOfWork.CompleteAsync();
        }

        public async Task UpdateStateForCancelUser(string vin, string emailBuyer, decimal totalCost, string email, CancellationToken cancellationToken = default)
        {
            Car car = await unitOfWork.AsyncRepositoryCar.GetCarByVinAndEmailForOrder(vin, email);
            if (car == null)
                throw new CarVinWithEmailFound(vin, email, "not found");
            await UpdateStateForCancel(
              vin,
              emailBuyer,
             totalCost
             );
        }

        public async Task UpdateStateForConfirm(
            string vin,
            string emailBuyer,
            decimal totalCost,
            CancellationToken cancellationToken = default
            )
        {
            Car car = await unitOfWork.AsyncRepositoryCar.GetCarByVinForOrder(vin);
            if (car == null || car.IsActive == false)
                throw new CarVinError(vin);
            User user =
                await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(emailBuyer);
            if (user == null)
                throw new UserStatusIsNotValidOrUserNotFound(emailBuyer);
            Order order = new
            ()
            {
                CarId = car.Id,
                TotalCost = totalCost,
                UserId = user.Id,
            };
            order = await unitOfWork.AsyncRepositoryOrder.GetByOrderParams(order);
            if (order == null)
                throw new OrderNotFound();
            if (order != null && order.State == State.PAID)
                throw new OrderErrorUpdateState(order.State.ToString());
            order.State = State.CONFIRM;
            unitOfWork.AsyncRepositoryOrder.Update(order);
            await unitOfWork.CompleteAsync();
        }

        public async Task UpdateStateForConfirmUser(string vin, string emailBuyer, decimal totalCost, string email, CancellationToken cancellationToken = default)
        {
            Car car = await unitOfWork.AsyncRepositoryCar.GetCarByVinAndEmailForOrder(vin, email);
            if (car == null)
                throw new CarVinWithEmailFound(vin, email, "not found");
            await UpdateStateForConfirm(
            vin,
            emailBuyer,
            totalCost
            );
        }

        public async Task UpdateStateForPaid(
            string vin,
            string emailBuyer,
            decimal totalCost,
            string cardNumber,
            int month,
            int year,
            int cvc,
                      string carOwnerName,
            CancellationToken cancellationToken = default
            )
        {
            Car car = await unitOfWork.AsyncRepositoryCar.GetCarByVinForOrder(vin);
            if (car == null || car.IsActive == false)
                throw new CarVinError(vin);
            User user =
                await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(emailBuyer);
            if (user == null)
                throw new UserStatusIsNotValidOrUserNotFound(emailBuyer);
            Order order = new
            ()
            {
                CarId = car.Id,
                TotalCost = totalCost,
                UserId = user.Id,
            };
            order = await unitOfWork.AsyncRepositoryOrder.GetByOrderParams(order);
            if (order == null)
                throw new OrderNotFound();
            if (order != null && order.State != State.CONFIRM)
                throw new OrderErrorUpdateState(order.State.ToString());
            order.State = State.PAID;
            order.DateOfBuyCar = DateTime.Now;
            PayDataDto payData = new()
            {
                CardNumber = cardNumber,
                Month = month,
                Year = year,
                CVC = cvc,
                CardOwnerName = carOwnerName,
                TotalCost = totalCost
            };
            if (!(await asynHttpClient.Post(payData)))
            {
                throw new PayError();
            }
            ClientCar clientCar = await unitOfWork.AsyncRepositoryClientCar
                .GetCarByVin(vin);
            if (clientCar == null)
            {
                clientCar = new()
                {
                    RegisterNumber = null,
                    UserId = user.Id,
                    CarId = car.Id,
                };
                await unitOfWork.AsyncRepositoryClientCar.Create(clientCar);
            }
            else
            {
                if (order.ChangeRegisterNumber)
                {
                    clientCar.RegisterNumber = null;
                    clientCar.UserId = user.Id;
                }
                else
                {
                    clientCar.UserId = user.Id;
                }
                unitOfWork.AsyncRepositoryClientCar.Update(clientCar);
            }
            car.IsActive = !car.IsActive;
            unitOfWork.AsyncRepositoryCar.Update(car);
            unitOfWork.AsyncRepositoryOrder.Update(order);
            await unitOfWork.CompleteAsync();
            IEnumerable<Order> orders = await unitOfWork.AsyncRepositoryOrder.GetByVin(vin);
            foreach (var i in orders)
                i.State = State.CANCEL;
            unitOfWork.AsyncRepositoryOrder.UpdateRange(orders);
            await unitOfWork.CompleteAsync();
        }
    }
}
