namespace Domain.Exceptions
{
    public class ErrorRoleEmployee : BadRequestException
    {
        public ErrorRoleEmployee()
            : base("Error: You cannot change this user if the user has the wrong role.")
        {
        }
    }
}
