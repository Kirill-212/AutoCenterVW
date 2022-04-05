namespace Domain.Exceptions
{
    public class AuthInvalidEmail : BadRequestException
    {
        public AuthInvalidEmail()
             : base("Error: Email account is not valid.")
        {
        }
    }
}
