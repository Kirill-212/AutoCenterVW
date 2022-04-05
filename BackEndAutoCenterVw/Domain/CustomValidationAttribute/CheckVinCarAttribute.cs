using System.ComponentModel.DataAnnotations;

namespace Domain.CustomValidationAttribute
{
    public class CheckVinCarAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value != null)
            {
                if (value.ToString().Length == 17)
                    return true;
                ErrorMessage = "Error:Value VIN  is not correct.Example: XW8ZZZ5NZAG123456(17)";

                return false;
            }
            else
            {
                ErrorMessage = "Error:Value VIN  is not correct.Example: XW8ZZZ5NZAG123456(17)";

                return false;

            }
        }
    }
}
