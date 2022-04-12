using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Domain.CustomValidationAttribute
{
    public class CheckRegisterNumberAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            Regex regex = new("^[0-9]{4} ['A','B','E','I','K','M','H','O','P','C','T','X']{2}-[1-7]$");
            if (value != null)
            {
                MatchCollection matches = regex.Matches(value.ToString());
                if (matches.Count == 1) return true;
                ErrorMessage = $"Error: RegisterNumber is not correct  {value}.";

                return false;
            }
            else
            {
                return true;
            }
        }
    }
}