using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PostNewDto
    {
        [StringLength(40,
            MinimumLength = 3,
            ErrorMessage = "Error: title length must be between 3 and 40 characters."
            )]
        [Required(ErrorMessage = "Error: title is required.")]
        public string Title { get; set; }

        [StringLength(100,
            MinimumLength = 13,
            ErrorMessage = "Error: description length must be between 13 and 100 characters."
            )]
        [Required(ErrorMessage = "Error: description is required.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Error: email is required.")]
        public string Email { get; set; }
    }
}
