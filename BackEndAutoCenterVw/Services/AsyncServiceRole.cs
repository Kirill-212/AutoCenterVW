using Domain.Models;
using Domain.Repositories;
using Services.Abstractions;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Services
{
    internal sealed class AsyncServiceRole : IAsyncServiceRole<Role>
    {
        private readonly IUnitOfWork unitOfWork;

        public AsyncServiceRole(
          IUnitOfWork unitOfWork
            )
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Role>> GetAll(
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryRole.GetAll();
        }

        public async Task<IEnumerable<Role>> GetWithoutUser(CancellationToken cancellationToken = default)
        {
            return await unitOfWork.AsyncRepositoryRole.GetWithourUser();
        }
    }
}
