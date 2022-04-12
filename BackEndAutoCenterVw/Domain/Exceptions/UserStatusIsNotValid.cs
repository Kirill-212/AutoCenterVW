namespace Domain.Exceptions
{
    public class UserStatusIsNotValid : BadRequestException
    {
        public UserStatusIsNotValid(string email)
            : base($"Error: User status is created or deleted {email}.")
        {
        }
    }
}
