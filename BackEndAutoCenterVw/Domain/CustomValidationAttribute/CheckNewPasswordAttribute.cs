using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Domain.CustomValidationAttribute
{
    public class CheckNewPasswordAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            Regex regex = new("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
            if (value != null)
            {
                MatchCollection matches = regex.Matches(value.ToString());
                if (matches.Count == 1) return true;
                ErrorMessage = $"Error: New password is not valid  {value}.1 number. 1 upper letter.1 lower letter and one '-' min 8 lenght.";

                return false;
            }
            else
            {
                return true;
            }
        }
    }
}