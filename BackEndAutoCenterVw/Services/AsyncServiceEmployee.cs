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
    internal sealed class AsyncServiceEmployee : IAsyncServiceEmployee<Employee>
    {
        private readonly IUnitOfWork unitOfWork;

        public AsyncServiceEmployee(
           IUnitOfWork unitOfWork
            )
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task Create(Employee item, string roleName,
            string email,
            CancellationToken cancellationToken = default
            )
        {
            User user = await unitOfWork.AsyncRepositoryUser.GetByEmail(email);
            if (user == null)
                throw new UserEmailNotFound(email);
            if (user.Status != Status.CREATED &&user.Status!=Status.ACTIVE)
                throw new UserStatusNotValid(user.Status.ToString());
            item.StartWorkDate = DateTime.Now;
            item.UserId = user.Id;
            user.Status = Status.ACTIVE;
            user.Role = null;
            Roles role = (Roles)Enum.Parse(typeof(Roles), roleName);
            if (role == Roles.USER) throw new RoleIsNotValid();
            user.RoleId = (int)role;
            unitOfWork.AsyncRepositoryUser.Update(user);
            await unitOfWork.CompleteAsync();
            await unitOfWork.AsyncRepositoryEmployee.Create(item);
            await unitOfWork.CompleteAsync();
        }

        public async Task<Employee> FindById(int id,
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryEmployee.GetById(id);
        }

        public async Task<Employee> FindByUserEmail(string email,
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryEmployee.FindByUserEmail(email);
        }

        public async Task<IEnumerable<Employee>> GetAll(
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryEmployee.Get();
        }

        public async Task<IEnumerable<Employee>> GetCarPeraitEmp()
        {
            return await unitOfWork.AsyncRepositoryEmployee.GetCarRepairEmp();
        }

        public async Task Remove(string email,
            CancellationToken cancellationToken = default
            )
        {
            Employee employee =
                await unitOfWork.AsyncRepositoryEmployee.FindByUserEmail(email);
            if (employee == null)
                throw new EmployeeNotFound(email);
            User user = await unitOfWork.AsyncRepositoryUser.GetByEmail(email);
            if (user.RoleId == (int)Roles.USER)
                throw new ErrorRoleEmployee();
            //if (user.Status == Status.CREATED || user.Status == Status.DELETED)
            //    throw new CheckUserStatus(user.Status.ToString());
            user.Status = Status.DELETED;
            unitOfWork.AsyncRepositoryUser.Update(user);
            await unitOfWork.CompleteAsync();
            unitOfWork.AsyncRepositoryEmployee.Update(employee);
            await unitOfWork.CompleteAsync();

        }

        public async Task Update(Employee item, string roleName, string email,
            CancellationToken cancellationToken = default
            )
        {
            Employee employee = await unitOfWork.AsyncRepositoryEmployee.FindByUserEmail(email);
            if (employee == null)
                throw new EmployeeNotFound(email);
            User user = await unitOfWork.AsyncRepositoryUser.GetByEmail(email);
            if (user.RoleId == (int)Roles.USER)
                throw new ErrorRoleEmployee();
            if (user.Status != Status.ACTIVE)
                throw new UserStatusNotValid(user.Status.ToString());
            Roles role = (Roles)Enum.Parse(typeof(Roles), roleName);
            if (role == Roles.USER)
                throw new RoleIsNotValid();
            user.RoleId = (int)role;
            employee.Address = item.Address;
            unitOfWork.AsyncRepositoryUser.Update(user);
            await unitOfWork.CompleteAsync();
            unitOfWork.AsyncRepositoryEmployee.Update(employee);
            await unitOfWork.CompleteAsync();
        }
    }
}
