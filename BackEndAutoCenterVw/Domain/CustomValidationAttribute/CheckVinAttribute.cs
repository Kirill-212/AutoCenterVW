using System.ComponentModel.DataAnnotations;

namespace Domain.CustomValidationAttribute
{
    public class CheckVinAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value != null)
            {
                if (value.ToString().Length > 0)
                    return true;
                ErrorMessage = "Check your new VIN";

                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
