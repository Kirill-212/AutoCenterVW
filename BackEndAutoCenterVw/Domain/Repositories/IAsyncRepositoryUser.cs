using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryUser<T> : IAsyncRepository<T>
    {
        Task<IEnumerable<T>> GetAllUsersNotAddedToEmp();

        Task<T> GetByEmail(string email);

        Task<T> GetActiveUserByEmail(string email);

        Task<IEnumerable<T>> GetAllActve();
    }
}
