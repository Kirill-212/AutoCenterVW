using Domain.CustomValidationAttribute;
using System;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class UpdateStateCarRepairForStartWorkDto
    {
        [Required(ErrorMessage = "Error: email employee is required.")]
        public string EmailEmployee { get; set; }

        [Required(ErrorMessage = "Error: vin is required.")]
        public string Vin { get; set; }

        [CheckDateWork]
        public DateTime StartWork { get; set; }

        [CheckDateWork]
        public DateTime EndWork { get; set; }
    }
}
