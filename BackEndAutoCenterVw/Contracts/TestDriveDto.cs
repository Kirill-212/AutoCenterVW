using Domain.CustomValidationAttribute;
using System;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class TestDriveDto
    {
        [Required]
        [CheckDateWork]
        public DateTime DateStart { get; set; }

        [CheckTestDriveTime]
        [Required]
        public int Time { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Vin { get; set; }
    }
}
