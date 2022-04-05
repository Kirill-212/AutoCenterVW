using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.CarEquipment
{
    public class CarEquipmentFormItem
    {
        public string Name { get; set; }

        public ValueCarEquipment EquipmentItem { get; set; }
    }
}
