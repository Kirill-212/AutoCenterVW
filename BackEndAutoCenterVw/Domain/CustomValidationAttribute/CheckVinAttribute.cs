using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Domain.CustomValidationAttribute
{
    public class CheckVinAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            Regex regex = new("^[0 - 9A - HJ - NPR - Z]{ 17}$");
            if (value != null)
            {
                MatchCollection matches = regex.Matches(value.ToString());
                if (matches.Count == 1) return true;
                ErrorMessage = $"Error:Value VIN  is not correct.";

                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
