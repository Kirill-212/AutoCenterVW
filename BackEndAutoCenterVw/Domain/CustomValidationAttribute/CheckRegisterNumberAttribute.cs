using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Domain.CustomValidationAttribute
{
    public class CheckRegisterNumberAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            Regex regex = new("^[0-9]{4} ['А','В','Е','І','К','М','Н','О','Р','С','Т','Х']{2}-[1-7]$");
            if (value != null)
            {
                MatchCollection matches = regex.Matches(value.ToString());
                if (matches.Count == 1) return true;
                ErrorMessage = $"RegisterNumber is not correct  {value}";

                return false;
            }
            else
            {
                return true;
            }
        }
    }
}