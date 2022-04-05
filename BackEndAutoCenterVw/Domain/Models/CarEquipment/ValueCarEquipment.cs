using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.CarEquipment
{
    public class ValueCarEquipment
    {
        public string Value { get; set; }

        public decimal Cost { get; set; }

        public bool IsDeleted { get; set; }
    }
}
