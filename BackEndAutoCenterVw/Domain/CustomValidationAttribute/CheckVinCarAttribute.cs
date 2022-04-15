using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Domain.CustomValidationAttribute
{
    public class CheckVinCarAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            Regex regex = new("^(([a-h,A-H,j-n,J-N,p-z,P-Z,0-9]{9})([a-h,A-H,j-n,J-N,p,P,r-t,R-T,v-z,V-Z,0-9])([a-h,A-H,j-n,J-N,p-z,P-Z,0-9])(\\d{6}))$");
            if (value != null)
            {
                MatchCollection matches = regex.Matches(value.ToString());
                if (matches.Count == 1) return true;
                ErrorMessage = $"Error:Value VIN  is not correct.";

                return false;
            }
            else
            {
                ErrorMessage = "Error:Value VIN  is not correct.";

                return false;

            }
        }
    }
}
