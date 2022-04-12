using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class UpdateStateOrderForPaidDto
    {
        [Required(ErrorMessage = "Error: vin is required.")]
        public string VIN { get; set; }

        [Required(ErrorMessage = "Error: buyer email is required.")]
        public string EmailBuyer { get; set; }

        [Required(ErrorMessage = "Error: total cost is required.")]
        public decimal TotalCost { get; set; }

        [Required(ErrorMessage = "Error: card number is required.")]
        public string CardNumber { get; set; }

        [Required(ErrorMessage = "Error: month is required.")]

        public int Month { get; set; }

        [Required(ErrorMessage = "Error:year is required.")]
        public int Year { get; set; }

        [Required(ErrorMessage = "Error: cvc is required.")]

        public int CVC { get; set; }

        [Required(ErrorMessage = "Error: card owner name is required.")]

        public string CardOwnerName { get; set; }

    }
}
