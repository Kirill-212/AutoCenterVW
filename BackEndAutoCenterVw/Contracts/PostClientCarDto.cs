using Domain.CustomValidationAttribute;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PostClientCarDto
    {
        [Required]
        public PostCarDto PostCarDto { get; set; }

       
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [CheckRegisterNumber]
        public string RegisterNumber { get; set; }
    }
}
