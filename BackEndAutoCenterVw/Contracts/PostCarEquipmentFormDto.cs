using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PostCarEquipmentFormDto
    {
        [Required]
        [StringLength(50,
            MinimumLength = 3,
            ErrorMessage = "Name length must be between 3 and 50 characters"
            )]
        public string Name { get; set; }

        [Required]
        public List<ValueCarEquipmentDto> EquipmentItems { get; set; }
    }
}
