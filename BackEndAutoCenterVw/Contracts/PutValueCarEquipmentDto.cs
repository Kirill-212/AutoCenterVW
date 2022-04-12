using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PutValueCarEquipmentDto
    {
        [Required(ErrorMessage = "Error: value is required.")]
        [StringLength(20,
           MinimumLength = 1,
           ErrorMessage = "Error: equipment items value length must be between 1 and 20 characters."
           )]
        public string Value { get; set; }

        [Required(ErrorMessage = "Error: deleted is required.")]
        public bool IsDeleted { get; set; }

        [Required(ErrorMessage = "Error: cost is required.")]
        public decimal Cost { get; set; }
    }
}
