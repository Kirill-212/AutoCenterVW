using System.ComponentModel.DataAnnotations;

namespace Domain.CustomValidationAttribute
{
    public class CheckNewNameCarEquipmentAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value != null)
            {
                if (value.ToString().Length > 3 && value.ToString().Length < 50) return true;
                ErrorMessage = $"String length must be between 3 and 50 characters  {value}";

                return false;
            }
            else
            {
                return true;
            }
        }
    }
}