using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Services.Abstractions
{
    public interface IAsyncServiceCarRepair<T>
    {
        Task Create(
            string emailOwner,
            string email,
            string vin,
            string description,
            CancellationToken cancellationToken = default
            );

        Task<IEnumerable<T>> GetForEmployee(
            string email,
            CancellationToken cancellationToken = default
            );

        Task<IEnumerable<T>> GetForUser(
            string email,
            CancellationToken cancellationToken = default
            );

        Task UpdateStateForCancel(
            string emailEmployee,
            string vin,
            CancellationToken cancellationToken = default
            );

        Task UpdateStateForCancelUser(
            string emailOwner,
            string emailEmployee,
            string vin,
            CancellationToken cancellationToken = default
            );

        Task UpdateStateForStartWork(
            DateTime startWork,
            DateTime endWork,
             string emailEmployee,
            string vin,
            CancellationToken cancellationToken = default
            );

        Task UpdateStateForEndWork(
            string emailEmployee,
            string vin,
            CancellationToken cancellationToken = default
            );
    }
}
