using Domain.CustomValidationAttribute;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PutCarEquipmentFormDto
    {
        [Required(ErrorMessage = "Error: name is required.")]
        [StringLength(50,
            MinimumLength = 3,
            ErrorMessage = "Error: name length must be between 3 and 50 characters."
            )]
        public string Name { get; set; }

        [CheckNameCarEquipmentFormDto]
        public string NewName { get; set; }

        [Required(ErrorMessage = "Error: equipment items is required.")]
        public List<PutValueCarEquipmentDto> EquipmentItems { get; set; }
    }
}
