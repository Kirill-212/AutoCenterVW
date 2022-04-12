using Domain.CustomValidationAttribute;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PostEmployeeDto
    {
        [Required(ErrorMessage = "Error: address is required.")]
        [StringLength(50,
            MinimumLength = 10,
            ErrorMessage = "Error: address string length must be between 10 and 50 characters."
            )]
        public string Address { get; set; }

        [Required(ErrorMessage = "Error: email is required.")]
        public string Email { get; set; }

        [CheckRole]
        [Required(ErrorMessage = "Error: role is required.")]
        public string RoleName { get; set; }
    }
}
