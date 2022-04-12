namespace Domain.Exceptions
{
    public class RoleUserPutError : BadRequestException
    {
        public RoleUserPutError(string roleNmae)
            : base($"Error: It is forbidden to delete a user with a role {roleNmae}.")
        {
        }
    }
}
