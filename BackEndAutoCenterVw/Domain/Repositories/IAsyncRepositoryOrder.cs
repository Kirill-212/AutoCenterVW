using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryOrder<T> : IAsyncRepository<T>
    {

        Task<T> GetByOrderParams(T item);

        Task<IEnumerable<T>> GetForUser(string email);

        Task<IEnumerable<T>> GetForBuyer(string email);

        Task<IEnumerable<T>> GetForEmployee();
    }
}
