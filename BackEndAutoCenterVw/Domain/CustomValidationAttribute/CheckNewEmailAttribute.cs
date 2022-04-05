using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Domain.CustomValidationAttribute
{
    public class CheckNewEmailAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            Regex regex = new("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$");
            if (value != null)
            {
                MatchCollection matches = regex.Matches(value.ToString());
                if (matches.Count == 1) return true;
                ErrorMessage = $"New email is not valid  {value}";

                return false;
            }
            else
            {
                return true;
            }
        }
    }
}