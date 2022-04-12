using System.ComponentModel.DataAnnotations;

namespace Domain.CustomValidationAttribute
{
    public class CheckNewTitleAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value != null)
            {
                if (value.ToString().Length >= 3 && value.ToString().Length <= 40) return true;
                ErrorMessage = $"Error: Your title is not valid lenght  {value}[3,40].";

                return false;
            }
            else
            {
                return true;
            }
        }
    }
}