namespace Domain.Exceptions
{
    public sealed class UserEmailIsAlredyAdded : BadRequestException
    {
        public UserEmailIsAlredyAdded(string email)
            : base($"The email alredy is use {email}")
        {
        }
    }
}
