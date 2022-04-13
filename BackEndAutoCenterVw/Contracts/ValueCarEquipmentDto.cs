using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class ValueCarEquipmentDto
    {
        [Required(ErrorMessage = "Error: equipment items value is required.")]
        [StringLength(20,
            MinimumLength = 1,
            ErrorMessage = "Error: equipment items value length must be between 1 and 20 characters."
            )]
        public string Value { get; set; }

        [Required(ErrorMessage = "Error: equipment items cost is required.")]
        [Range(0, 1000000, ErrorMessage = "Error: valid cost is 0-1 000 000.")]
        public decimal Cost { get; set; }
    }
}
