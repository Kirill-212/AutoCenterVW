namespace Domain.Exceptions
{
    public class RoleUserPutError : BadRequestException
    {
        public RoleUserPutError(string roleNmae)
            : base($"Error: you cannot update this user, his role not {roleNmae}.")
        {
        }
    }
}
