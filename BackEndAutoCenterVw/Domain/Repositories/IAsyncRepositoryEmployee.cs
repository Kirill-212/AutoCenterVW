using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryEmployee<T> : IAsyncRepository<T>
    {
        Task<T> FindByIdUser(int id);

        Task<T> FindByUserEmail(string email);
    }
}
