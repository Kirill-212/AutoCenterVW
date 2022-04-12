using Domain.CustomValidationAttribute;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PutCarDto
    {
        [Required(ErrorMessage = "Error: name car equipment is required.")]
        public string NameCarEquipment { get; set; }

        [Required(ErrorMessage = "Error: cost is required.")]
        [Range(1, 1000000, ErrorMessage = "Error: valid cost is 1-1 000 000.")]
        public decimal Cost { get; set; }

        [CheckVinCar]
        public string VIN { get; set; }

        [CheckVin]
        public string NewVIN { get; set; }

        [Required(ErrorMessage = "Error: car mileage is required.")]
        [Range(1, 1000000, ErrorMessage = "Error: valid car mileage is 1-1 000 000.")]
        public long CarMileage { get; set; }

        [CheckDateOfRealeseCar]
        [Required(ErrorMessage = "Error: date of realese car is required.")]
        public DateTime DateOfRealeseCar { get; set; }

        [CheckSharePercentageForPostOrPutCar]
        public int? SharePercentage { get; set; }

        [Required(ErrorMessage = "Error: img/imgs is required.")]
        public List<ImgDto> Imgs { get; set; }
    }
}
