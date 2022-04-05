using Domain.CustomValidationAttribute;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PutNewDto
    {
        [StringLength(40,
           MinimumLength = 3,
           ErrorMessage = "Title length must be between 3 and 10 characters"
           )]
        [Required]
        public string Title { get; set; }
        
        [CheckNewTitle]
        public string NewTitle { get; set; }

        [StringLength(50,
            MinimumLength = 13,
            ErrorMessage = "Description length must be between 13 and 50 characters"
            )]
        [Required]
        public string Description { get; set; }
    }
}
