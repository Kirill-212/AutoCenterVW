using Domain.Exceptions;
using Domain.Models;
using Domain.Repositories;
using Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Services
{
    internal sealed class AsyncServiceTestDrive : IAsyncServiceTestDrive<TestDrive>
    {
        private readonly IUnitOfWork unitOfWork;

        public AsyncServiceTestDrive()
        {
        }

        public AsyncServiceTestDrive(
          IUnitOfWork unitOfWork
            )
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task Create(string email,
            string vin,
            string time,
            DateTime dateStart, CancellationToken cancellationToken = default)
        {
            User user = await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(email);
            if (user == null) 
                throw new UserStatusIsNotValidOrUserNotFound(email);
            Car car = await unitOfWork.AsyncRepositoryCar.GetByVin(vin);
            if (car == null || car.IsActive == true || car.ClientCar != null)
                throw new TestDriveCarError(vin);
            TestDrive testDrive = new()
            {
                UserId = user.Id,
                CarId = car.Id,
                Time = time,
                DateStart = dateStart,
                stateTestDrive = StateTestDrive.PENDING
            };

            TestDrive checkTestDrive =
                await unitOfWork.AsyncRepositoryTestDrive.GetByCarRepairParams(testDrive);
            if (checkTestDrive != null) 
                throw new TestDriveFoundError(vin);
            await unitOfWork.AsyncRepositoryTestDrive.Create(testDrive);
            await unitOfWork.CompleteAsync();
        }

        public async Task<IEnumerable<TestDrive>> GetForEmployee(
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryTestDrive.GetForEmployee();
        }

        public async Task<IEnumerable<TestDrive>> GetForUser(
            string email,
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryTestDrive.GetForUser(email);
        }

        public async Task UpdateStateForCancel(
            string email,
            string vin,
            string time,
            DateTime dateStart,
            CancellationToken cancellationToken = default
            )
        {

            User user = await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(email);
            if (user == null) throw new UserStatusIsNotValidOrUserNotFound(email);

           Car car = await unitOfWork.AsyncRepositoryCar.GetByVin(vin);
            if (car == null || car.IsActive == true || car.ClientCar != null)
                throw new TestDriveCarError(vin);
            TestDrive testDrive = new()
            {
                UserId = user.Id,
                CarId = car.Id,
                Time = time,
                DateStart = dateStart,
            };

            TestDrive checkTestDrive =
                await unitOfWork.AsyncRepositoryTestDrive.GetByCarRepairParams(testDrive);
            if (checkTestDrive == null) throw new TestDriveNotFound();
            checkTestDrive.stateTestDrive = StateTestDrive.CANCEL;
            unitOfWork.AsyncRepositoryTestDrive.Update(checkTestDrive);
            await unitOfWork.CompleteAsync();
        }

        public async Task UpdateStateForConfirm(
            string email,
            string vin,
            string time,
            DateTime dateStart,
            CancellationToken cancellationToken = default
            )
        {
            User user = await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(email);
            if (user == null)
                throw new UserStatusIsNotValidOrUserNotFound(email);
            Car car = await unitOfWork.AsyncRepositoryCar.GetByVin(vin);
            if (car == null || car.IsActive == true || car.ClientCar != null)
                throw new TestDriveCarError(vin);
            TestDrive testDrive = new()
            {
                UserId = user.Id,
                CarId = car.Id,
                Time = time,
                DateStart = dateStart,
            };
            TestDrive checkTestDrive =
                await unitOfWork.AsyncRepositoryTestDrive.GetByCarRepairParams(testDrive);
            if (checkTestDrive == null) 
                throw new TestDriveNotFound();
            checkTestDrive.stateTestDrive = StateTestDrive.CONFIRM;
            unitOfWork.AsyncRepositoryTestDrive.Update(checkTestDrive);
            await unitOfWork.CompleteAsync();
        }
    }
}
