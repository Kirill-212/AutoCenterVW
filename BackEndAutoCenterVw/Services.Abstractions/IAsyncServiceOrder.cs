using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Services.Abstractions
{
    public interface IAsyncServiceOrder<T>
    {
        Task Create(
            bool changeRegisterNumber,
            string vin,
            string emailOwner
            , string emailBuyer,
            CancellationToken cancellationToken = default
            );

        Task<IEnumerable<T>> GetForEmployee(CancellationToken cancellationToken = default);

        Task<IEnumerable<T>> GetForUser(
            string email, 
            CancellationToken cancellationToken = default
            );

        Task<IEnumerable<T>> GetForBuyer(
            string email, 
            CancellationToken cancellationToken = default
            );

        Task UpdateStateForCancel(
            string vin,
            string emailBuyer,
            decimal totalCost,
            CancellationToken cancellationToken = default
            );

        Task UpdateStateForConfirm(
            string vin,
            string emailBuyer,
            decimal totalCost,
            CancellationToken cancellationToken = default
            );

        Task UpdateStateForPaid(
            string vin,
            string emailBuyer,
            decimal totalCost,
            string cardNumber,
            int month,
            int year,
            int cvc,
          string carOwnerName,
            CancellationToken cancellationToken = default
            );
    }
}
