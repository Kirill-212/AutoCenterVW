using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.CustomValidationAttribute
{
    public class CheckBdayAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value != null)
            {
                DateTime dateTime = (DateTime)value;
                if (dateTime < DateTime.Now && dateTime < DateTime.Now.AddYears(-18))
                {
                    return true;
                }
                else
                {
                    ErrorMessage = "DBay is not correct. You are under 18.";

                    return false;
                }
            }
            else
            {
                return true;
            }
        }
    }
}
