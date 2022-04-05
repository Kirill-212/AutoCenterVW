using Domain.CustomValidationAttribute;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PutCarEquipmentDto
    {
        [Required]
        [StringLength(50,
            MinimumLength = 3,
            ErrorMessage = "String length must be between 3 and 50 characters"
            )]
        public string Name { get; set; }

        [CheckNewNameCarEquipment]
        public string NewName { get; set; }

        [Required]
        public List<CarEquipmentFormItemDto> Equipments { get; set; }

    }
}
