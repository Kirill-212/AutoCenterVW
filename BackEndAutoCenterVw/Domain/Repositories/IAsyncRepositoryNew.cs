using System.Linq;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryNew<T> : IAsyncRepository<T>
    {
        IQueryable<T> GetPaged();
        Task<T> GetByTitle(string title);
    }
}
