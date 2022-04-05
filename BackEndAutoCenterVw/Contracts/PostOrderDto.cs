using Domain.CustomValidationAttribute;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PostOrderDto
    {
        [CheckVinCar]
        public string VIN { get; set; }

        public string EmailOwner { get; set; }

        [Required(ErrorMessage = "Buyer email is required")]
        public string EmailBuyer { get; set; }

        [Required]
        public bool ChangeRegisterNumber { get; set; }
    }
}
