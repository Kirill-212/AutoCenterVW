using Domain.CustomValidationAttribute;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PutCarDto
    {
        [Required]
        public string NameCarEquipment { get; set; }

        [Required]
        [Range(1, 1000000, ErrorMessage = "Error: valid cost is 1-1 000 000")]
        public decimal Cost { get; set; }

        [CheckVinCar]
        public string VIN { get; set; }

        [CheckVin]
        public string NewVIN { get; set; }

        [Required]
        [Range(1, 1000000, ErrorMessage = "Error: valid car mileage is 1-1 000 000")]
        public long CarMileage { get; set; }

        [CheckDateOfRealeseCar]
        [Required]
        public DateTime DateOfRealeseCar { get; set; }

        [CheckSharePercentageForPostOrPutCar]
        public int? SharePercentage { get; set; }

        [Required]
        public List<ImgDto> Imgs { get; set; }
    }
}
