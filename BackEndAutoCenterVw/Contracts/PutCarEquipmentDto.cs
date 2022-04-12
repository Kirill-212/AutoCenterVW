using Domain.CustomValidationAttribute;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PutCarEquipmentDto
    {
        [Required(ErrorMessage = "Error: name is required.")]
        [StringLength(50,
            MinimumLength = 3,
            ErrorMessage = "Error: name string length must be between 3 and 50 characters."
            )]
        public string Name { get; set; }

        [CheckNewNameCarEquipment]
        public string NewName { get; set; }

        [Required(ErrorMessage = "Error: equipments is required.")]
        public List<CarEquipmentFormItemDto> Equipments { get; set; }

    }
}
