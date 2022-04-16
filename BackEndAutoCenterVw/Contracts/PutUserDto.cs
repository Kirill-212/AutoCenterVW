using Domain.CustomValidationAttribute;
using System;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PutUserDto
    {
        [Required(ErrorMessage = "Error: first Name is required.")]
        [StringLength(50,
            MinimumLength = 3,
            ErrorMessage = "Error: first name string length must be between 3 and 50 characters."
            )]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Error: last Name is required.")]
        [StringLength(50, MinimumLength = 3,
            ErrorMessage = "Error: last name tring length must be between 3 and 50 characters."
            )]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Error: Surname is required.")]
        [StringLength(50,
            MinimumLength = 3,
            ErrorMessage = "Error: surname length must be between 3 and 50 characters."
            )]
        public string Surname { get; set; }

        [Required(ErrorMessage = "Error: photo is required.")]
        public string UrlPhoto { get; set; }

        public string NewUrlPhoto { get; set; }

        [CheckBday]
        [Required(ErrorMessage = "Error: dbay is required.")]
        public DateTime DBay { get; set; }

        [CheckNewPassword]
        public string NewPassword { get; set; }

        [RegularExpression(
            @"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}",
            ErrorMessage = "Error: email is not correct."
            )]
        [Required(ErrorMessage = "Error: email is required.")]
        public string Email { get; set; }

        [CheckNewEmail]
        public string NewEmail { get; set; }

        [Required(ErrorMessage = "Error: phone number is required.")]
        [RegularExpression(
            @"^\+375 \((17|29|33|44)\) [0-9]{3}-[0-9]{2}-[0-9]{2}$",
            ErrorMessage = "Error: phone number is not correct.Example +375 (29) 769-95-06."
            )]
        public string PhoneNumber { get; set; }
    }
}
