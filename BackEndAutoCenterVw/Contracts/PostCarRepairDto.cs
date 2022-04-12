using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PostCarRepairDto
    {
        [Required(ErrorMessage = "Error: description is required.")]
        [StringLength(100,
            MinimumLength = 3,
            ErrorMessage = "Error: description length must be between 3 and 100 characters."
            )]
        public string Description { get; set; }

        [Required(ErrorMessage = "Error: vin is required.")]
        public string Vin { get; set; }

        [Required(ErrorMessage = "Error: email is required.")]
        public string Email { get; set; }
    }
}
