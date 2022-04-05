using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryCarEquipmentForm<T>
    {

        Task Create(T item);

        IEnumerable<T> Get(bool isDeleted);

        IEnumerable<T> Get();

        T GetByName(string name, bool isDeleted = false);

        T GetByNameNotDeleted(string name);

        T GetById(string id, bool isDeleted = false);

        Task Update(T item);
    }
}
