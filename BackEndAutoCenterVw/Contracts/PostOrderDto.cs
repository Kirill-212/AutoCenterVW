using Domain.CustomValidationAttribute;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PostOrderDto
    {
        [CheckVinCar]
        public string VIN { get; set; }

        public string EmailOwner { get; set; }

        [Required(ErrorMessage = "Error: buyer email is required.")]
        public string EmailBuyer { get; set; }

        [Required(ErrorMessage = "Error: change register number is required.")]
        public bool ChangeRegisterNumber { get; set; }
    }
}
