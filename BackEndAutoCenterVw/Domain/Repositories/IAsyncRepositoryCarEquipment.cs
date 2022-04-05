using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryCarEquipment<T>
    {
        Task Create(T item);

        IEnumerable<T> Get(bool isDeleted);

        IEnumerable<T> Get();

        T GetByName(string name);

        T GetById(string id);

        T GetById(string id, bool isDeleted = false);

        Task Update(T item);

    }
}
