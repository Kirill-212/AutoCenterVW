using Domain.CustomValidationAttribute;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PutClientCarDto
    {
        [Required]
        public PutCarDto PutCarDto { get; set; }

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [CheckNewEmail]
        public string NewEmail { get; set; }

        [CheckRegisterNumber]
        public string RegisterNumber { get; set; }

        [CheckRegisterNumber]
        public string NewRegisterNumber { get; set; }

        [Required]
        public bool ChangeRegisterNumber { get; set; }
    }
}
