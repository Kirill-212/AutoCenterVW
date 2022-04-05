using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepository<T>
    {
        Task<T> GetById(int id);

        Task Create(T item);

        Task<IEnumerable<T>> Get();

        void Update(T item);
    }
}
