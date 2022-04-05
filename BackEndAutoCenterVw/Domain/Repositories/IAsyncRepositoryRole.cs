using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryRole<T>
    {
        Task<IEnumerable<T>> GetAll();
    }
}
