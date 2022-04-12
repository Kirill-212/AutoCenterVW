using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public class UpdateStateCarRepairDto
    {
        [Required(ErrorMessage = "Error: email employee is required.")]
        public string EmailEmployee { get; set; }

        [Required(ErrorMessage = "Error: vin is required.")]
        public string Vin { get; set; }
    }
}
