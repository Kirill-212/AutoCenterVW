using AutoMapper;
using Domain.Pagination;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Services.Abstractions
{
    public interface IAsyncServiceNew<T, K,C>
    {
        Task Create(
            T item,
            string email,
            List<K> imgs,
            CancellationToken cancellationToken = default
            );

        Task<T> FindById(int id, CancellationToken cancellationToken = default);

        Task<IEnumerable<T>> GetAll(CancellationToken cancellationToken = default);

        Task Remove(string title, CancellationToken cancellationToken = default);

        Task Update(
            T item,
            List<K> imgs,
            string newTitle = null,
            CancellationToken cancellationToken = default
            );

        Task<T> GetByTitile(string title, CancellationToken cancellationToken = default);

        PagedList<T, C> GetAllPaged(PagedParameters item,IMapper mapper);
    }
}
