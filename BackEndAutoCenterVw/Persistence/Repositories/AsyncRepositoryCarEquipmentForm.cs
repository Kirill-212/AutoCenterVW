using Domain.Models.CarEquipment;
using Domain.Repositories;
using Microsoft.Azure.Cosmos;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class AsyncRepositoryCarEquipmentForm :
        IAsyncRepositoryCarEquipmentForm<CarEquipmentForm>
    {
        private readonly Container _container;

        public AsyncRepositoryCarEquipmentForm(
            CosmosClient dbClient,
            string databaseName,
            string containerName
            )
        {
            _container = dbClient.GetContainer(databaseName, containerName);
        }

        public async Task Create(CarEquipmentForm item)
        {
            await _container.CreateItemAsync<CarEquipmentForm>(item, new PartitionKey(item.Id));
        }

        public IEnumerable<CarEquipmentForm> Get(bool isDeleted)
        {
            return _container.GetItemLinqQueryable<CarEquipmentForm>(true)
                .Where(i => i.IsDeleted == isDeleted)
                .Select(i => new CarEquipmentForm
                {
                    Id = i.Id,
                    Name = i.Name,
                    IsDeleted = i.IsDeleted,
                    EquipmentItems = i.EquipmentItems.Where(i => i.IsDeleted == isDeleted).ToList()
                })
                .ToList();
        }

        public IEnumerable<CarEquipmentForm> Get()
        {
            return _container.GetItemLinqQueryable<CarEquipmentForm>(true)
                .ToList();
        }

        public CarEquipmentForm GetById(string id, bool isDeleted)
        {
            return _container.GetItemLinqQueryable<CarEquipmentForm>(true)
                .Where(i => i.IsDeleted == isDeleted)
                .Where(i => i.Id == id)
                .Select(i => new CarEquipmentForm
                {
                    Id = i.Id,
                    Name = i.Name,
                    IsDeleted = i.IsDeleted,
                    EquipmentItems = i.EquipmentItems.Where(i => i.IsDeleted == isDeleted).ToList()
                })
                .AsEnumerable()
                .FirstOrDefault();
        }

        public CarEquipmentForm GetByName(string name, bool isDeleted)
        {
            return _container.GetItemLinqQueryable<CarEquipmentForm>(true)
                .Where(i => i.IsDeleted == isDeleted)
                .Where(i => i.Name == name)
                .Select(i => new CarEquipmentForm
                {
                    Id = i.Id,
                    Name = i.Name,
                    IsDeleted = i.IsDeleted,
                    EquipmentItems = i.EquipmentItems.Where(i => i.IsDeleted == isDeleted).ToList()
                })
                .AsEnumerable()
                .FirstOrDefault();
        }

        public CarEquipmentForm GetByNameNotDeleted(string name)
        {
            return _container.GetItemLinqQueryable<CarEquipmentForm>(true)
                .Where(i => i.IsDeleted == false)
                .Where(i => i.Name == name).AsEnumerable()
                .FirstOrDefault();
        }

        public async Task Update(CarEquipmentForm item)
        {
            await _container.ReplaceItemAsync(item, item.Id, new PartitionKey(item.Id));
        }
    }
}
