using Domain.CustomValidationAttribute;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PutClientCarDto
    {
        [Required(ErrorMessage = "Error: put car dto is required.")]
        public PutCarDto PutCarDto { get; set; }

        [Required(ErrorMessage = "Error: email is required.")]
        public string Email { get; set; }

        [CheckNewEmail]
        public string NewEmail { get; set; }

        [CheckRegisterNumber]
        public string RegisterNumber { get; set; }

        [CheckRegisterNumber]
        public string NewRegisterNumber { get; set; }

        [Required(ErrorMessage = "Error: change register number is required.")]
        public bool ChangeRegisterNumber { get; set; }
    }
}
