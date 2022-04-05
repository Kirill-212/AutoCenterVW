using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public class PostCarRepairDto
    {
        [Required]
        [StringLength(100,
            MinimumLength = 3,
            ErrorMessage = "Description length must be between 3 and 100 characters"
            )]
        public string Description { get; set; }

        [Required]
        public string Vin { get; set; }

        [Required]
        public string Email { get; set; }
    }
}
