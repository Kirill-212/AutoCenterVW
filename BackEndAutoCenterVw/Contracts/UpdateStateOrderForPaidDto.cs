using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class UpdateStateOrderForPaidDto
    {
        [Required]
        public string VIN { get; set; }

        [Required(ErrorMessage = "Buyer email is required")]
        public string EmailBuyer { get; set; }

        [Required]
        public decimal TotalCost { get; set; }

        [Required]
        public string CardNumber { get; set; }

        [Required]

        public int Month { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]

        public int CVC { get; set; }

        [Required]

        public string CardOwnerName { get; set; }

    }
}
