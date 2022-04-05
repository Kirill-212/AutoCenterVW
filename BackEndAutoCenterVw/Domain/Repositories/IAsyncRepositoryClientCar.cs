using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryClientCar<T> : IAsyncRepository<T>
    {
        Task<T> GetByRegisterNumber(string registerNumber);

        Task<T> GetCarByCarVinWithEmail(string vin, string email);
    }
}
