using Domain.CustomValidationAttribute;
using System;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class PostUserDto
    {
        [Required(ErrorMessage = "Error: first name is required.")]
        [StringLength(50,
            MinimumLength = 3,
            ErrorMessage = "Error: first name string length must be between 3 and 50 characters."
            )]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Error: last name is required.")]
        [StringLength(50,
            MinimumLength = 3,
            ErrorMessage = "Error: last name string length must be between 3 and 50 characters."
            )]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Error: photo is required.")]
        public string UrlPhoto { get; set; }

        [Required(ErrorMessage = "Error: surname is required.")]
        [StringLength(50,
            MinimumLength = 3,
            ErrorMessage = "Error: surname string length must be between 3 and 50 characters."
            )]
        public string Surname { get; set; }

        [CheckBday]
        [Required(ErrorMessage = "Error: dbay is required.")]
        public DateTime DBay { get; set; }

        [Required(ErrorMessage = "Error: password is required.")]
        [RegularExpression(
            @"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
            ErrorMessage = "Error: password is not correct .1 number. 1 upper letter.1 lower letter and one '-' min 8 lenght."
            )]
        public string Password { get; set; }

        [RegularExpression(
            @"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}",
            ErrorMessage = "Error: email is not correct."
            )]
        [Required(ErrorMessage = "Error: email is required.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Error: phone number is required.")]
        [Phone]
        public string PhoneNumber { get; set; }
    }
}
