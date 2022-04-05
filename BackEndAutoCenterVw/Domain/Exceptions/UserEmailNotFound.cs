namespace Domain.Exceptions
{
    public class UserEmailNotFound : NotFoundException
    {
        public UserEmailNotFound(string email)
            : base($"This emaul is not found {email}")
        {
        }
    }
}