namespace Domain.Exceptions
{
    public class UserUpdateError : BadRequestException
    {
        public UserUpdateError()
            : base($"Error: You cannot update this user.")
        {
        }
    }
}
