using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryCarRepair<T> : IAsyncRepository<T>
    {
        Task<T> GetByCarRepairParams(T item);

        Task<IEnumerable<T>> GetForUser(string email);

        Task<IEnumerable<T>> GetForEmployee(string email);

        Task<IEnumerable<T>> GetCarRepairForEmployee(int idEmployee);
    }
}
