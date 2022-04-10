using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryCar<T> : IAsyncRepository<T>
    {
        Task<T> GetByVin(string vin);

        void UpdateRange(List<T> items);

        Task<IEnumerable<T>> GetWithoutClientCar();

        Task<T> GetByVinNotAddedEmp(string vin);

        Task<IEnumerable<T>> GetCarForUser();

        Task<IEnumerable<T>> GetCarByEmail(string email);

        Task<T> GetCarByVinForOrder(string vin);

        Task<T> GetCarByVinAndEmailForOrder(string vin, string email);


        Task<IEnumerable<T>> GetCarActive();

        IQueryable<T> GetPaged();

    }
}
