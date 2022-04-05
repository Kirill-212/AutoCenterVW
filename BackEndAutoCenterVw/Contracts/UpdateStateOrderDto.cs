using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class UpdateStateOrderDto
    {
        [Required]
        public string VIN { get; set; }

        [Required(ErrorMessage = "Buyer email is required")]
        public string EmailBuyer { get; set; }

        public decimal TotalCost { get; set; }
    }
}
