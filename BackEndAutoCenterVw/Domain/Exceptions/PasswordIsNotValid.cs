namespace Domain.Exceptions
{
    public class PasswordIsNotValid : BadRequestException
    {
        public PasswordIsNotValid(string password)
            : base($"Error: The password is not valid {password}.")
        {
        }
    }
}