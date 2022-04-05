using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Services.Abstractions
{
    public interface IAsyncServiceClientCar<T>
    {
        Task Create(
            T item,
            string email,
            int? sharePercentage,
            string nameCarEquipment,
            CancellationToken cancellationToken = default
            );

        Task<IEnumerable<T>> GetAll(CancellationToken cancellationToken = default);

        Task<T> GetById(int id, CancellationToken cancellationToken = default);

        Task Update(
            T item,
            int? sharePercentage,
            string oldEmail,
            string newEmail,
            string newRegisterNumber,
            string nameCarEquipment = null,
            bool changeRegisterNumber = false,
            string newVin = null,
            CancellationToken cancellationToken = default
            );

        Task Remove(string registerNumber, CancellationToken cancellationToken = default);
    }
}
