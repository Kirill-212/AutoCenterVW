namespace Domain.Exceptions
{
    public class UserStatusIsNotValid : BadRequestException
    {
        public UserStatusIsNotValid(string email)
            : base($"User status is created or deleted {email}")
        {
        }
    }
}
