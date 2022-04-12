using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.CustomValidationAttribute
{
    public class CheckSharePercentageForPostOrPutCarAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value != null)
            {
                int result = Convert.ToInt32(value);

                if (result > 0 && result <= 100)
                {
                    return true;
                }
                ErrorMessage = "Error: This SharePercentage is not valid value [1,100].";
            }
            else
            {
                return true;
            }

            return false;
        }
    }
}
