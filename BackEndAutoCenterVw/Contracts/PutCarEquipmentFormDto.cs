using Domain.CustomValidationAttribute;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PutCarEquipmentFormDto
    {
        [Required]
        [StringLength(50,
            MinimumLength = 3,
            ErrorMessage = "Name length must be between 3 and 50 characters"
            )]
        public string Name { get; set; }

        [CheckNameCarEquipmentFormDto]
        public string NewName { get; set; }

        [Required]
        public List<PutValueCarEquipmentDto> EquipmentItems { get; set; }
    }
}
