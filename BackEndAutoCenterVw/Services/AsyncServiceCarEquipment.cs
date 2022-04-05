using Domain.Exceptions;
using Domain.Models.CarEquipment;
using Domain.Repositories;
using Services.Abstractions;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Services
{
    public class AsyncServiceCarEquipment :
        IAsyncServiceCarEquipment<CarEquipment>
    {

        private readonly IAsyncRepositoryCarEquipment<CarEquipment> asyncRepositoryCarEquipment;

        public AsyncServiceCarEquipment(
            IAsyncRepositoryCarEquipment<CarEquipment> asyncRepositoryCarEquipment
            )
        {
            this.asyncRepositoryCarEquipment = asyncRepositoryCarEquipment;
        }

        public async Task Create(CarEquipment item, CancellationToken cancellationToken = default)
        {
            CarEquipment carEquipment = asyncRepositoryCarEquipment.GetByName(item.Name);
            if (carEquipment != null)
                throw new CarEquipmentNameAlredyAdded(item.Name);
            item.Id = (asyncRepositoryCarEquipment.Get().Count() + 1).ToString();
            await asyncRepositoryCarEquipment.Create(item);
        }

        public IEnumerable<CarEquipment> GetAll(CancellationToken cancellationToken = default)
        {
            return asyncRepositoryCarEquipment.Get(false);
        }

        public CarEquipment GetById(string id, CancellationToken cancellationToken = default)
        {
            return asyncRepositoryCarEquipment.GetById(id, false);
        }

        public CarEquipment GetByName(string name, CancellationToken cancellationToken = default)
        {
            return asyncRepositoryCarEquipment.GetByName(name);
        }

        public async Task Remove(string name, CancellationToken cancellationToken = default)
        {
            CarEquipment carEquipment = asyncRepositoryCarEquipment.GetByName(name);
            if (carEquipment == null)
                throw new CarEquipmentNotFound(name);
            carEquipment.IsDeleted = true;
            await asyncRepositoryCarEquipment.Update(carEquipment);
        }

        public async Task Update(
            CarEquipment item,
            string newName = null,
            CancellationToken cancellationToken = default
            )
        {
            CarEquipment carEquipment =
                asyncRepositoryCarEquipment.GetByName(item.Name);
            if (carEquipment == null)
                throw new CarEquipmentNotFound(item.Name);
            if (newName != null)
            {
                CarEquipment carEquipmentCheckNewName =
                    asyncRepositoryCarEquipment.GetByName(newName);
                if (carEquipmentCheckNewName != null)
                    throw new CarEquipmentNameAlredyAdded(newName);
                carEquipment.Name = newName;
            }
            var newCarEquipmentItems = item.Equipments.Select(i => i.Name).ToList();
            var oldCarEquipmentItems = carEquipment.Equipments.Select(i => i.Name).ToList();
            List<string> ExceptCarEuipmentItemsRigth =
                newCarEquipmentItems.Except(oldCarEquipmentItems).ToList();
            List<string> IntersectCarEquipmentItemsRigth =
                newCarEquipmentItems.Intersect(oldCarEquipmentItems).ToList();
            List<string> ExceptCarEuipmentItemsLeft =
                oldCarEquipmentItems.Except(newCarEquipmentItems).ToList();
            List<CarEquipmentFormItem> UnionCarEquipmentItems =
                item.Equipments.Where(i => ExceptCarEuipmentItemsRigth.Contains(i.Name)).ToList()
                .Union(item.Equipments.Where(i => IntersectCarEquipmentItemsRigth.Contains(i.Name)).ToList())
                .Union(carEquipment.Equipments.Where(i => ExceptCarEuipmentItemsLeft.Contains(i.Name)).ToList())
                .ToList();
            carEquipment.Equipments = UnionCarEquipmentItems;
            await asyncRepositoryCarEquipment.Update(carEquipment);
        }
    }
}
