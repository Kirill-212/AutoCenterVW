using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PutValueCarEquipmentDto
    {
        [Required(ErrorMessage = "Equipment items value is required")]
        [StringLength(20,
           MinimumLength = 1,
           ErrorMessage = "Equipment items value length must be between 1 and 20 characters"
           )]
        public string Value { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

        [Required(ErrorMessage = "Equipment items cost is required")]
        public decimal Cost { get; set; }
    }
}
