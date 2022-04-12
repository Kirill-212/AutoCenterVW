using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class UpdateStateOrderDto
    {
        [Required(ErrorMessage = "Error: vin is required.")]
        public string VIN { get; set; }

        [Required(ErrorMessage = "Error: buyer email is required.")]
        public string EmailBuyer { get; set; }

        public decimal TotalCost { get; set; }
    }
}
