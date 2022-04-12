using Domain.CustomValidationAttribute;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PostClientCarDto
    {
        [Required(ErrorMessage = "Error: post car dto is required.")]
        public PostCarDto PostCarDto { get; set; }

       
        [Required(ErrorMessage = "Error: email is required.")]
        public string Email { get; set; }

        [CheckRegisterNumber]
        public string RegisterNumber { get; set; }
    }
}
