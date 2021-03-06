using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Services.Abstractions
{
    public interface IAsyncServiceTestDrive<T>
    {
        Task Create(
                     string email,
            string vin,
            string time,
            DateTime dateStart,
             CancellationToken cancellationToken = default
            );

        Task<IEnumerable<T>> GetForUser(
            string email,
            CancellationToken cancellationToken = default
            );
        Task<IEnumerable<T>> GetByVinWithDate(string vin, DateTime time, CancellationToken cancellationToken = default);
        Task<IEnumerable<T>> GetForEmployee(CancellationToken cancellationToken = default);

        Task UpdateStateForCancel(
           string email,
            string vin,
            string time,
            DateTime dateStart,
           CancellationToken cancellationToken = default
           );

        Task UpdateStateForCancelUser(
           string email,
            string vin,
            string time,
            DateTime dateStart,
           CancellationToken cancellationToken = default
           );

        Task UpdateStateForConfirm(
            string email,
            string vin,
            string time,
            DateTime dateStart,
            CancellationToken cancellationToken = default
            );

    }
}
