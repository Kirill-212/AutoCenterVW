using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PostCarEquipmentDto
    {
        [Required]
        [StringLength(50,
            MinimumLength = 3,
            ErrorMessage = "String length must be between 3 and 50 characters"
            )]
        public string Name { get; set; }

        [Required]
        public List<CarEquipmentFormItemDto> Equipments { get; set; }

    }
}
