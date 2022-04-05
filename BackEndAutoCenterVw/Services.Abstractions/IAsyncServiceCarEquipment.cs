using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Services.Abstractions
{
    public interface IAsyncServiceCarEquipment<T>
    {
        Task Create(T item, CancellationToken cancellationToken = default);

        IEnumerable<T> GetAll(CancellationToken cancellationToken = default);

        T GetByName(string name, CancellationToken cancellationToken = default);

        T GetById(string id, CancellationToken cancellationToken = default);

        Task Update(T item, string newName = null, CancellationToken cancellationToken = default);

        Task Remove(string name, CancellationToken cancellationToken = default);
    }
}
