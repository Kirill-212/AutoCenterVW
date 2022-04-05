using Domain.CustomValidationAttribute;
using System;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PutUserDto
    {
        [Required(ErrorMessage = "First Name is required")]
        [StringLength(50,
            MinimumLength = 3,
            ErrorMessage = "String length must be between 3 and 50 characters"
            )]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        [StringLength(50, MinimumLength = 3,
            ErrorMessage = "String length must be between 3 and 50 characters"
            )]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Surname is required")]
        [StringLength(50,
            MinimumLength = 3,
            ErrorMessage = "String length must be between 3 and 50 characters"
            )]
        public string Surname { get; set; }

        [Required(ErrorMessage = "UrlPhoto")]
        public string UrlPhoto { get; set; }


        public string NewUrlPhoto { get; set; }

        [CheckBday]
        [Required(ErrorMessage = "Dbay is required")]
        public DateTime DBay { get; set; }

        [CheckNewPassword]
        public string NewPassword { get; set; }

        [RegularExpression(
            @"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}",
            ErrorMessage = "Email is not correct"
            )]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [CheckNewEmail]
        public string NewEmail { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        [Phone]
        public string PhoneNumber { get; set; }
    }
}
