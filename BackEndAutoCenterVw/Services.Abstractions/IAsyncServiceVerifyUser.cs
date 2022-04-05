using System.Threading.Tasks;

namespace Services.Abstractions
{
    public interface IAsyncServiceVerifyUser<T>
    {
        Task<T> VerifyUser(string password, string email);
    }
}
