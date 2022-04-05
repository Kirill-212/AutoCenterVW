namespace Domain.Exceptions
{
    public class AuthInvalidStatus : BadRequestException
    {
        public AuthInvalidStatus()
             : base("Error: Status account is not active.")
        {
        }
    }
}
