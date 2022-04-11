using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Services.Abstractions
{
    public interface IAsyncServiceEmployee<T>
    {
        Task Create(
            T item,
            string roleName,
            string email,
            CancellationToken cancellationToken = default
            );

        Task<T> FindById(int id, CancellationToken cancellationToken = default);

        Task<T> FindByUserEmail(
            string email,
            CancellationToken cancellationToken = default
            );

        Task<IEnumerable<T>> GetAll(CancellationToken cancellationToken = default);

        Task Remove(string email, CancellationToken cancellationToken = default);

        Task Update(
            T item,
            string roleName,
            string email,
            CancellationToken cancellationToken = default
            );

        Task<IEnumerable<T>> GetCarPeraitEmp();
    }
}
