using System.ComponentModel.DataAnnotations;

namespace Domain.CustomValidationAttribute
{
    public class CheckNameCarEquipmentFormDto : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value != null)
            {
                if (value.ToString().Length >= 3 || value.ToString().Length <= 50) return true;
                ErrorMessage = $"Error: New name is not valid  {value}   [3,50].";

                return false;
            }
            else
            {
                return true;
            }
        }
    }
}