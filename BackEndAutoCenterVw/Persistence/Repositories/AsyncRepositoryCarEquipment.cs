using Domain.Models.CarEquipment;
using Domain.Repositories;
using Microsoft.Azure.Cosmos;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class AsyncRepositoryCarEquipment :
        IAsyncRepositoryCarEquipment<CarEquipment>
    {

        private readonly Container _container;

        public AsyncRepositoryCarEquipment()
        {
        }

        public AsyncRepositoryCarEquipment(
            CosmosClient dbClient,
            string databaseName,
            string containerName
            )
        {
            _container = dbClient.GetContainer(databaseName, containerName);
        }

        public async Task Create(CarEquipment item)
        {
            await _container.CreateItemAsync<CarEquipment>(item, new PartitionKey(item.Id));
        }

        public IEnumerable<CarEquipment> Get(bool isDeleted)
        {
            return _container.GetItemLinqQueryable<CarEquipment>(true)
                .Where(i => i.IsDeleted == isDeleted)
                .ToList();
        }

        public IEnumerable<CarEquipment> Get()
        {
            return _container.GetItemLinqQueryable<CarEquipment>(true)
                .ToList();
        }

        public CarEquipment GetById(string id)
        {
            return _container.GetItemLinqQueryable<CarEquipment>(true)
                .Where(i => i.Id == id)
                .AsEnumerable()
                .FirstOrDefault();
        }

        public CarEquipment GetById(string id, bool isDeleted = false)
        {
            return _container.GetItemLinqQueryable<CarEquipment>(true)
                .Where(i => i.Id == id)
                .Where(i => i.IsDeleted == isDeleted)
                .AsEnumerable()
                .FirstOrDefault();
        }

        public CarEquipment GetByName(string name)
        {
            return _container.GetItemLinqQueryable<CarEquipment>(true)
                .Where(i => i.Name == name)
                .Where(i => i.IsDeleted == false)
                .AsEnumerable()
                .FirstOrDefault();
        }

        public async Task Update(CarEquipment item)
        {
            await _container.ReplaceItemAsync(item, item.Id, new PartitionKey(item.Id));
        }
    }
}
