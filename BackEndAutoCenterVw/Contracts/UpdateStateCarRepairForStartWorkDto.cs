using Domain.CustomValidationAttribute;
using System;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class UpdateStateCarRepairForStartWorkDto
    {
        [Required]
        public string EmailEmployee { get; set; }

        [Required]
        public string Vin { get; set; }

        [CheckDateWork]
        public DateTime StartWork { get; set; }

        [CheckDateWork]
        public DateTime EndWork { get; set; }
    }
}
