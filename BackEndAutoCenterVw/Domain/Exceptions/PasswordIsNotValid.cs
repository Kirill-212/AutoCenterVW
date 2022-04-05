namespace Domain.Exceptions
{
    public class PasswordIsNotValid : BadRequestException
    {
        public PasswordIsNotValid(string password)
            : base($"The password is not valid {password}")
        {
        }
    }
}