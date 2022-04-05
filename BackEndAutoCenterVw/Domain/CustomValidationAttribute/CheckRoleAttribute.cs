using Domain.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.CustomValidationAttribute
{
    public class CheckRoleAttribute : ValidationAttribute
    {

        public override bool IsValid(object value)
        {

            if (value != null)
            {
                if (Enum.IsDefined(typeof(Roles), value))
                {
                    return true;
                }
                ErrorMessage = $"Role is not valid  {value}";

                return false;
            }
            else
            {
                return true;
            }
        }
    }
}