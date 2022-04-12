using Domain.CustomValidationAttribute;
using System;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class TestDriveDto
    {
        [Required(ErrorMessage = "Error: date start is required.")]
        [CheckDateWork]
        public DateTime DateStart { get; set; }

        [CheckTestDriveTime]
        [Required(ErrorMessage = "Error: time is required.")]
        public int Time { get; set; }

        [Required(ErrorMessage = "Error: email is required.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Error: vin is required.")]
        public string Vin { get; set; }
    }
}
