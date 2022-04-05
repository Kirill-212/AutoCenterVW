using Domain.Exceptions;
using Domain.HashPassword;
using Domain.Models;
using Domain.Repositories;
using Services.Abstractions;
using System.Threading.Tasks;

namespace Services
{
    public class AsyncServiceVerifyUser : IAsyncServiceVerifyUser<User>
    {
        private readonly IUnitOfWork unitOfWork;

        public AsyncServiceVerifyUser(
          IUnitOfWork unitOfWork
            )
        {
            this.unitOfWork = unitOfWork;
        }
        public async Task<User> VerifyUser(string password, string email)
        {
            User checkFoundUser =
                await unitOfWork.AsyncRepositoryUser.GetByEmail(email);
            if (checkFoundUser == null)
                throw new AuthInvalidEmail();
            if (checkFoundUser.Status != Status.ACTIVE)
                throw new AuthInvalidStatus();
            if (!HashPassword.Verify(checkFoundUser.Password, password))
                throw new AuthInvalidPassword();

            return checkFoundUser;
        }
    }
}
