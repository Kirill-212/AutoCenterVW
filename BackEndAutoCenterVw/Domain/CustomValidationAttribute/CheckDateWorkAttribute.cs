using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.CustomValidationAttribute
{
    public class CheckDateWorkAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {

            DateTime dateTime = (DateTime)value;
            if (dateTime < DateTime.Now)
            {
                ErrorMessage = $"Error: Date must be greater than current.";

                return false;
            }
            else
            {
                if (dateTime.DayOfWeek == DayOfWeek.Saturday || dateTime.DayOfWeek == DayOfWeek.Sunday)
                {
                    ErrorMessage = $"Error: The date must not fall on a weekend.";

                    return false;
                }

                return true;
            }
        }
    }
}
