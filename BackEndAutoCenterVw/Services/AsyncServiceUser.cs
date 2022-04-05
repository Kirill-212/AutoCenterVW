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
          IUnitOfWork unitOfWork
            )
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
            unitOfWork.AsyncRepositoryUser.Update(user);
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
                item.Password=user.Password;
            }
            item.Id = user.Id;
            item.Status = user.Status;
            item.RoleId = user.RoleId;
            unitOfWork.AsyncRepositoryUser.Update(item);
            await unitOfWork.CompleteAsync();
        }

        public async Task UpdateStatusByEmail(string email,
            CancellationToken cancellationToken = default
            )
        {
            User user = await unitOfWork.AsyncRepositoryUser.GetByEmail(email);
            if (user == null) throw new UserEmailNotFound(email);
            if (user.Role.Id != (int)Roles.USER) throw new CheckRoleUser(Roles.USER.ToString());
            user.Status = user.Status == Status.ACTIVE ? Status.CREATED : Status.ACTIVE;
            unitOfWork.AsyncRepositoryUser.Update(user);
            await unitOfWork.CompleteAsync();
        }
    }
}
