using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.CustomValidationAttribute
{
    public class CheckTestDriveTimeAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            int result = Convert.ToInt32(value);
            if (result < 9 || result > 17)
            {
                ErrorMessage = "Operating time error test drive from 9 to 17";

                return false;
            }

            return true;
        }
    }
}
