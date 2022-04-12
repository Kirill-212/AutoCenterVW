namespace Domain.Exceptions
{
    public class UserStatusNotValid : BadRequestException
    {
        public UserStatusNotValid(string status)
            : base($"Error: User status is not valid {status}.")
        {
        }
    }
}
