using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Services.Abstractions
{
    public interface IAsyncServiceUser<T>
    {
        Task<IEnumerable<T>> GetAllUsersNotAddedToEmp(
            CancellationToken cancellationToken = default
            );

        Task<T> GetByEmail(string email, CancellationToken cancellationToken = default);

        Task UpdateStatusByEmail(string email, CancellationToken cancellationToken = default);

        Task Create(T item, CancellationToken cancellationToken = default);

        Task<T> FindById(int id, CancellationToken cancellationToken = default);

        Task<IEnumerable<T>> GetAll(CancellationToken cancellationToken = default);

        Task Remove(string email, CancellationToken cancellationToken = default);

        Task Update(
            T item,
            string newUrlPhoto = null,
            string newEmail = null,
            string newPassword = null,
            CancellationToken cancellationToken = default
            );

    }
}
