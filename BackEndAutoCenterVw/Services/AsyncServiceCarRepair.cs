using Domain.Exceptions;
using Domain.Models;
using Domain.Repositories;
using Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Services
{
    internal sealed class AsyncServiceCarRepair : IAsyncServiceCarRepair<CarRepair>
    {
        private readonly IUnitOfWork unitOfWork;
        public AsyncServiceCarRepair(
           IUnitOfWork unitOfWork
            )
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task Create(
            string emailOwner,
            string email,
            string vin,
            string description,
            CancellationToken cancellationToken = default
            )
        {
            Car car = await unitOfWork.AsyncRepositoryCar.GetCarByVinAndEmailForOrder(vin, emailOwner);
            if (car == null)
                throw new CarVinFound(vin, "found, but this is not your car");
            User user =
                await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(email);
            if (user == null)
                throw new UserStatusIsNotValidOrUserNotFound(email);
            if (user != null && user.Employee == null)
                throw new CarRepairEmployeeError(email);
            car = await unitOfWork.AsyncRepositoryCar.GetByVin(vin);
            if (car == null || car.IsActive == true || car.ClientCar == null)
                throw new CarRepairCarError(vin);
            CarRepair carRepair = new()
            {
                CarId = car.Id,
                EmployeeId = user.Id,
                Description = description,
                StartWork = null,
                EndWork = null,
                StateCarRepair = StateCarRepair.PENDING
            };
            CarRepair checkCarRepair =
                await unitOfWork.AsyncRepositoryCarRepair.GetByCarRepairParamsNotEmp(carRepair);
            if (checkCarRepair != null &&
                checkCarRepair.StateCarRepair != StateCarRepair.ENDWORK &&
                checkCarRepair.StateCarRepair != StateCarRepair.CANCEL
                )
                throw new CarRepairStateCarRepairError(checkCarRepair.StateCarRepair.ToString());
            await unitOfWork.AsyncRepositoryCarRepair.Create(carRepair);
            await unitOfWork.CompleteAsync();
        }

        public async Task<IEnumerable<CarRepair>> GetByEmailCarRepairs(string email, CancellationToken cancellationToken = default)
        {
            return await unitOfWork.AsyncRepositoryCarRepair.GetByEmailCarRepairs(email);
        }

        public async Task<IEnumerable<CarRepair>> GetForEmployee(
            string email,
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryCarRepair.GetForEmployee(email);
        }

        public async Task<IEnumerable<CarRepair>> GetForUser(
            string email,
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryCarRepair.GetForUser(email);
        }

        public async Task UpdateStateForCancel(
            string emailEmployee,
            string vin,
            CancellationToken cancellationToken = default
            )
        {
            User user =
                await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(emailEmployee);
            if (user == null)
                throw new UserStatusIsNotValidOrUserNotFound(emailEmployee);
            if (user != null && user.Employee == null)
                throw new CarRepairEmployeeError(emailEmployee);
            Car car = await unitOfWork.AsyncRepositoryCar.GetByVin(vin);
            if (car == null || car.IsActive == true || car.ClientCar == null)
                throw new CarRepairCarError(vin);
            CarRepair carRepair = new()
            {
                CarId = car.Id,
                EmployeeId = user.Id
            };
            CarRepair checkCarRepair =
                await unitOfWork.AsyncRepositoryCarRepair.GetByCarRepairParams(carRepair);
            if (checkCarRepair == null)
                throw new CarRepairNotFound();
            if (
                checkCarRepair.StateCarRepair != StateCarRepair.PENDING &&
                checkCarRepair.StateCarRepair != StateCarRepair.STARTWORK
                )
                throw new CarRepairStateCarRepairError(checkCarRepair.StateCarRepair.ToString());
            checkCarRepair.StateCarRepair = StateCarRepair.CANCEL;
            unitOfWork.AsyncRepositoryCarRepair.Update(checkCarRepair);
            await unitOfWork.CompleteAsync();
        }

        public async Task UpdateStateForCancelUser(string emailOwner, string emailEmployee, string vin, CancellationToken cancellationToken = default)
        {
            Car car = await unitOfWork.AsyncRepositoryCar.GetCarByVinAndEmailForOrder(vin, emailOwner);
            if (car == null)
                throw new CarVinFound(vin, "found, but this is not your car");
            User user =
                await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(emailEmployee);
            if (user == null)
                throw new UserStatusIsNotValidOrUserNotFound(emailEmployee);
            if (user != null && user.Employee == null)
                throw new CarRepairEmployeeError(emailEmployee);
            car = await unitOfWork.AsyncRepositoryCar.GetByVin(vin);
            if (car == null || car.IsActive == true || car.ClientCar == null)
                throw new CarRepairCarError(vin);
            CarRepair carRepair = new()
            {
                CarId = car.Id,
                EmployeeId = user.Id
            };
            CarRepair checkCarRepair =
                await unitOfWork.AsyncRepositoryCarRepair.GetByCarRepairParams(carRepair);
            if (checkCarRepair == null)
                throw new CarRepairNotFound();
            if (
                checkCarRepair.StateCarRepair != StateCarRepair.PENDING 
                )
                throw new CarRepairStateCarRepairError(checkCarRepair.StateCarRepair.ToString());
            checkCarRepair.StateCarRepair = StateCarRepair.CANCEL;
            unitOfWork.AsyncRepositoryCarRepair.Update(checkCarRepair);
            await unitOfWork.CompleteAsync();
        }

        public async Task UpdateStateForEndWork(
            string emailEmployee,
            string vin,
            CancellationToken cancellationToken = default
            )
        {
            User user =
                await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(emailEmployee);
            if (user == null)
                throw new UserStatusIsNotValidOrUserNotFound(emailEmployee);
            if (user != null && user.Employee == null)
                throw new CarRepairEmployeeError(emailEmployee);
            Car car = await unitOfWork.AsyncRepositoryCar.GetByVin(vin);
            if (car == null || car.IsActive == true || car.ClientCar == null)
                throw new CarRepairCarError(vin);
            CarRepair carRepair = new()
            {
                CarId = car.Id,
                EmployeeId = user.Id
            };
            CarRepair checkCarRepair =
                await unitOfWork.AsyncRepositoryCarRepair.GetByCarRepairParams(carRepair);
            if (checkCarRepair == null)
                throw new CarRepairNotFound();
            if (checkCarRepair.StateCarRepair != StateCarRepair.STARTWORK)
                throw new CarRepairStateCarRepairError(checkCarRepair.StateCarRepair.ToString());
            checkCarRepair.StateCarRepair = StateCarRepair.ENDWORK;
            unitOfWork.AsyncRepositoryCarRepair.Update(checkCarRepair);
            await unitOfWork.CompleteAsync();
        }

        public async Task UpdateStateForStartWork(
            DateTime startWork,
            DateTime endWork,
            string emailEmployee,
            string vin,
            CancellationToken cancellationToken = default
            )
        {
            User user =
                await unitOfWork.AsyncRepositoryUser.GetActiveUserByEmail(emailEmployee);
            if (user == null)
                throw new UserStatusIsNotValidOrUserNotFound(emailEmployee);
            if (user != null && user.Employee == null)
                throw new CarRepairEmployeeError(emailEmployee);
            Car car = await unitOfWork.AsyncRepositoryCar.GetByVin(vin);
            if (car == null || car.IsActive == true || car.ClientCar == null)
                throw new CarRepairCarError(vin);
            if (startWork > endWork)
                throw new CarRepairDateNotValid(startWork.ToString(), endWork.ToString());
            List<CarRepair> carRepairList =
                (await unitOfWork.AsyncRepositoryCarRepair.GetCarRepairForEmployee(user.Id)).ToList();

            if (carRepairList
                .Where(i => (i.StartWork < startWork && i.EndWork > startWork))
                .ToList().Count > 0 ||
                carRepairList
                .Where(i => (i.StartWork < endWork && i.EndWork > endWork))
                .ToList().Count > 0 ||
                
                carRepairList
                .Where(i => (i.StartWork > startWork && i.EndWork < endWork) )
                .ToList().Count > 0 ||
                carRepairList
                .Where(i => i.StartWork == startWork || i.EndWork == endWork)
               .ToList().Count > 0)
                throw new CarRepairDateIsNotValid(startWork.ToString(), endWork.ToString());
            CarRepair carRepair = new()
            {
                CarId = car.Id,
                EmployeeId = user.Id
            };
            CarRepair checkCarRepair =
                await unitOfWork.AsyncRepositoryCarRepair.GetByCarRepairParams(carRepair);
            if (checkCarRepair == null)
                throw new CarRepairNotFound();
            if (checkCarRepair.StateCarRepair != StateCarRepair.PENDING)
                throw new CarRepairStateCarRepairError(checkCarRepair.StateCarRepair.ToString());
            checkCarRepair.StateCarRepair = StateCarRepair.STARTWORK;
            checkCarRepair.StartWork = startWork;
            checkCarRepair.EndWork = endWork;
            unitOfWork.AsyncRepositoryCarRepair.Update(checkCarRepair);
            await unitOfWork.CompleteAsync();
        }
    }
}
