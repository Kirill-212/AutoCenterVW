using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PayDataDto
    {
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
