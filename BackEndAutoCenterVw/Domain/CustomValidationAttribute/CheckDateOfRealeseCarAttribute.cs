using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.CustomValidationAttribute
{
    public class CheckDateOfRealeseCarAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value != null)
            {
                DateTime dateTime = (DateTime)value;
                if (dateTime < DateTime.Now && dateTime > DateTime.Now.AddYears(-20))
                {
                    return true;
                }
                else
                {
                    ErrorMessage = $"Date of realese can not valid. Valid value is  {DateTime.Now}  to {DateTime.Now.AddYears(-20)}";

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