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
        public string Name { get; set; }

        [Required(ErrorMessage = "Equipment items is required")]

        public List<ValueCarEquipmentDto> EquipmentItems { get; set; }
    }
}
