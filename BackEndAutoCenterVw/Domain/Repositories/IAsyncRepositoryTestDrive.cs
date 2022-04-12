using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryTestDrive<T> : IAsyncRepository<T>
    {

        Task<IEnumerable<T>> GetForUser(string email);

        Task<IEnumerable<T>> GetForEmployee();

        Task<T> GetByCarRepairParams(T item);

        void UpdateRange(IEnumerable<T> items);

        Task<IEnumerable<T>> GetByVin(string vin);

        Task<IEnumerable<T>> GetByEmail(string email);
    }
}
