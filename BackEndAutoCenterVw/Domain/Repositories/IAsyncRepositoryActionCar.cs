using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryActionCar<T> : IAsyncRepository<T>
    {
        Task<T> GetBySharePercentage(int sharePercentage);

        void DeleteRange(List<T> items);
    }
}
