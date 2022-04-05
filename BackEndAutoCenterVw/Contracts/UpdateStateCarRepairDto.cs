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
        [Required]
        public string EmailEmployee { get; set; }

        [Required]
        public string Vin { get; set; }
    }
}
