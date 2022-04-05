namespace Domain.Exceptions
{
    public class AuthInvalidPassword : BadRequestException
    {
        public AuthInvalidPassword()
             : base("Error: Password account is not valid.")
        {
        }
    }
}
