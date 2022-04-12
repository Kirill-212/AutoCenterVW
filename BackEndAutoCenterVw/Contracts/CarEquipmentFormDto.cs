using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class CarEquipmentFormDto
    {
        public string Name { get; set; }

        [Required(ErrorMessage = "Error: equipment items is required.")]

        public List<ValueCarEquipmentDto> EquipmentItems { get; set; }
    }
}
