using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public class CarEquipmentFormDto
    {
        [Required(ErrorMessage = "Equipment items is required")]

        public Dictionary<string, ValueCarEquipmentDto[]> EquipmentItems { get; set; }
    }
}
