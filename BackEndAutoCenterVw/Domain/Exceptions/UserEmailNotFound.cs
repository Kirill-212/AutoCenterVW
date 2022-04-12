namespace Domain.Exceptions
{
    public class UserEmailNotFound : NotFoundException
    {
        public UserEmailNotFound(string email)
            : base($"Error: This email is not found {email}.")
        {
        }
    }
}