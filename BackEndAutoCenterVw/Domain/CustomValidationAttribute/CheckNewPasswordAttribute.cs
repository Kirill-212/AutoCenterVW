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
                ErrorMessage = $"New password is not valid  {value}";

                return false;
            }
            else
            {
                return true;
            }
        }
    }
}