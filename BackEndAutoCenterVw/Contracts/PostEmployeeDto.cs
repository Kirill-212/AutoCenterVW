using Domain.CustomValidationAttribute;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PostEmployeeDto
    {
        [Required]
        [StringLength(50,
            MinimumLength = 10,
            ErrorMessage = "String length must be between 3 and 50 characters"
            )]
        public string Address { get; set; }

        [Required]
        public string Email { get; set; }

        [CheckRole]
        [Required]
        public string RoleName { get; set; }
    }
}
