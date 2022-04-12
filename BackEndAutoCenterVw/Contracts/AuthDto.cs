using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class AuthDto
    {
        [Required(ErrorMessage = "Error: email is required.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Error: password is required.")]
        public string Password { get; set; }
    }
}
