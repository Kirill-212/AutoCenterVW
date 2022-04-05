using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Services.Abstractions
{
    public interface IAsyncServiceRole<T>
    {
        Task<IEnumerable<T>> GetAll(CancellationToken cancellationToken = default);
    }
}
