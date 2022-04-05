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
    public class AsyncServiceCarEquipmentForm :
        IAsyncServiceCarEquipmentForm<CarEquipmentForm>
    {
        private readonly IAsyncRepositoryCarEquipmentForm<CarEquipmentForm> asyncRepositoryCarEquipment;

        public AsyncServiceCarEquipmentForm(
            IAsyncRepositoryCarEquipmentForm<CarEquipmentForm> asyncRepositoryCarEquipment
            )
        {
            this.asyncRepositoryCarEquipment = asyncRepositoryCarEquipment;
        }

        public async Task Create(CarEquipmentForm item, CancellationToken cancellationToken = default)
        {

            if (asyncRepositoryCarEquipment.GetByNameNotDeleted(item.Name) != null)
                throw new CarEquipmentFormNameAlredyUse(item.Name);
            item.Id = (asyncRepositoryCarEquipment.Get().Count() + 1).ToString();
            foreach (var i in item.EquipmentItems)
            {
                if (item.EquipmentItems.Where(i => i.Value == i.Value)
                    .Where(i => i.IsDeleted == false).Count() > 1)
                    throw new CarEquipmentFormKeyEquipmentItemsError(i.Value);
                if (i.Cost < 0 || string.IsNullOrEmpty(i.Value))
                {
                    throw new ValueCarEquipmentIsNotValid(i.Cost.ToString(), i.Value);
                }
            }
            await asyncRepositoryCarEquipment.Create(item);
        }

        public IEnumerable<CarEquipmentForm> GetAll(CancellationToken cancellationToken = default)
        {
            return asyncRepositoryCarEquipment.Get(false);
        }

        public CarEquipmentForm GetById(string id, CancellationToken cancellationToken = default)
        {
            return asyncRepositoryCarEquipment.GetById(id, false);
        }

        public async Task Remove(string name, CancellationToken cancellationToken = default)
        {
            CarEquipmentForm carEquipmentForm = asyncRepositoryCarEquipment
                .GetByNameNotDeleted(name);
            if (carEquipmentForm == null) throw new CarEquipmentFormNotFound(name);
            carEquipmentForm.IsDeleted = true;
            carEquipmentForm.EquipmentItems = carEquipmentForm.EquipmentItems
                .Select(i => new ValueCarEquipment { Cost = i.Cost, Value = i.Value, IsDeleted = true })
                .ToList();
            await asyncRepositoryCarEquipment.Update(carEquipmentForm);
        }

        public async Task Update(
            CarEquipmentForm item,
            string newName = null,
            CancellationToken cancellationToken = default
            )
        {
            CarEquipmentForm carEquipmentForm =
                asyncRepositoryCarEquipment.GetByNameNotDeleted(item.Name);
            if (carEquipmentForm == null)
                throw new CarEquipmentFormNotFound(item.Name);
            if (newName != null)
            {
                if (asyncRepositoryCarEquipment.GetByNameNotDeleted(newName) != null)
                    throw new CarEquipmentFormNameAlredyUse(newName);
                item.Name = newName;
            }
            item.Id = carEquipmentForm.Id;
            foreach (var i in item.EquipmentItems)
            {
                if (item.EquipmentItems.Where(i => i.Value == i.Value).Where(i => i.IsDeleted == false).Count() > 1)
                    throw new CarEquipmentFormKeyEquipmentItemsError(i.Value);
                if (i.Cost < 0 || string.IsNullOrEmpty(i.Value))
                {
                    throw new ValueCarEquipmentIsNotValid(i.Cost.ToString(), i.Value);
                }
            }
            await asyncRepositoryCarEquipment.Update(item);
        }

    }
}
