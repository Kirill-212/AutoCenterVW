using System.Threading.Tasks;

namespace Domain.HttpClent
{
    public interface IAsynHttpClient<T>
    {
        Task<bool> Post(T item);

    }
}
