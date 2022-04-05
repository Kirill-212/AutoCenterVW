using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryNew<T> : IAsyncRepository<T>
    {
        Task<T> GetByTitle(string title);
    }
}
