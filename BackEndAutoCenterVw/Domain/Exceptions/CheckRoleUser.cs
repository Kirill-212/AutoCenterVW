namespace Domain.Exceptions
{
    public class CheckRoleUser : BadRequestException
    {
        public CheckRoleUser(string roleNmae)
            : base($"It is forbidden to delete a user with a role {roleNmae}")
        {
        }
    }
}
