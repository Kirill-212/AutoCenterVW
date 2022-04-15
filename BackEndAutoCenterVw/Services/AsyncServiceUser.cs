using Domain.Exceptions;
using Domain.HashPassword;
using Domain.Models;
using Domain.Repositories;
using Services.Abstractions;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Services
{
    internal sealed class AsyncServiceUser : IAsyncServiceUser<User>
    {
        private readonly IUnitOfWork unitOfWork;

        public AsyncServiceUser(
          IUnitOfWork unitOfWork)

        {

            this.unitOfWork = unitOfWork;
        }

        public async Task Create(User item, CancellationToken cancellationToken = default)
        {
            User user = await unitOfWork.AsyncRepositoryUser.GetByEmail(item.Email);
            if (user != null)
                throw new UserEmailIsAlredyAdded(item.Email);
            item.Password = HashPassword
               .HashPasswordUser(item.Password);
            item.Status = Status.CREATED;
            item.RoleId = (int)Roles.USER;
            await unitOfWork.AsyncRepositoryUser.Create(item);
            await unitOfWork.CompleteAsync();
        }

        public async Task<User> FindById(int id,
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryUser.GetById(id);
        }

        public async Task<IEnumerable<User>> GetAll(
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryUser.Get();
        }

        public async Task<IEnumerable<User>> GetAllActive(CancellationToken cancellationToken = default)
        {
            return await unitOfWork.AsyncRepositoryUser.GetAllActve();
        }

        public async Task<IEnumerable<User>> GetAllUsersNotAddedToEmp(
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryUser.GetAllUsersNotAddedToEmp();
        }

        public async Task<User> GetByEmail(string email,
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryUser.GetByEmail(email);
        }

        public async Task Remove(string email,
            CancellationToken cancellationToken = default
            )
        {
            User user = await unitOfWork.AsyncRepositoryUser.GetByEmail(email);
            if (user == null) throw new UserEmailNotFound(email);
            user.Status = Status.DELETED;

            IEnumerable<Car> cars = await unitOfWork.AsyncRepositoryCar.GetByEmail(email);
            foreach (var i in cars)
                await RemoveCar(i.VIN);
            IEnumerable<Order> orders = await unitOfWork.AsyncRepositoryOrder.GetByEmail(email);
            IEnumerable<TestDrive> testDrives = await unitOfWork.AsyncRepositoryTestDrive.GetByEmail(email);
            IEnumerable<CarRepair> carRepairs = await unitOfWork.AsyncRepositoryCarRepair.GetByEmail(email);
            foreach (var i in orders)
                i.State = State.CANCEL;
            foreach (var i in testDrives)
                i.stateTestDrive = StateTestDrive.CANCEL;
            foreach (var i in carRepairs)
                i.StateCarRepair = StateCarRepair.CANCEL;
            unitOfWork.AsyncRepositoryUser.Update(user);
            unitOfWork.AsyncRepositoryOrder.UpdateRange(orders);
            unitOfWork.AsyncRepositoryTestDrive.UpdateRange(testDrives);
            unitOfWork.AsyncRepositoryCarRepair.UpdateRange(carRepairs);
            await unitOfWork.CompleteAsync();
        }

        public async Task RemoveCar(
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
            User item,
            string newUrlPhoto = null
            , string newEmail = null,
            string newPassword = null,
            CancellationToken cancellationToken = default
            )
        {
            User user = await unitOfWork.AsyncRepositoryUser.GetByEmail(item.Email);
            if (user == null) throw new UserEmailNotFound(item.Email);
            if (newEmail != null)
            {
                User Checkuser = await unitOfWork.AsyncRepositoryUser.GetByEmail(newEmail);
                if (Checkuser != null)
                    throw new UserEmailIsAlredyAdded(newEmail);
                item.Email = newEmail;
            }
            if (newUrlPhoto != null) item.UrlPhoto = newUrlPhoto;
            item.Password = user.Password;
            if (newPassword != null)
            {
                item.Password = HashPassword
                    .HashPasswordUser(newPassword);
            }
            else
            {
                item.Password = user.Password;
            }
            item.Id = user.Id;
            item.Status = user.Status;
            item.RoleId = user.RoleId;
            unitOfWork.AsyncRepositoryUser.Update(item);
            await unitOfWork.CompleteAsync();
        }

        public async Task UpdateForUser(User item, string email, string newUrlPhoto = null, string newEmail = null, string newPassword = null, CancellationToken cancellationToken = default)
        {
            if (item.Email != email)
                throw new UserUpdateError();
            await Update(
             item,
            newUrlPhoto
             , newEmail,
              newPassword
             );
        }

        public async Task UpdateStatusByEmail(string email,
            CancellationToken cancellationToken = default
            )
        {
            User user = await unitOfWork.AsyncRepositoryUser.GetByEmail(email);
            if (user == null) throw new UserEmailNotFound(email);
            if (user.Role.Id != (int)Roles.USER) throw new RoleUserPutError(Roles.USER.ToString());
            user.Status = user.Status == Status.ACTIVE ? Status.CREATED : Status.ACTIVE;
            unitOfWork.AsyncRepositoryUser.Update(user);
            await unitOfWork.CompleteAsync();
        }
    }
}
