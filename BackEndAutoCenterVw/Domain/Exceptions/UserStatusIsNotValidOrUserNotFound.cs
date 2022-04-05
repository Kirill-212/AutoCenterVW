namespace Domain.Exceptions
{
    public class UserStatusIsNotValidOrUserNotFound : BadRequestException
    {
        public UserStatusIsNotValidOrUserNotFound(string email)
            : base($"User status is created or deleted  or user with this email not found {email}")
        {
        }
    }
}