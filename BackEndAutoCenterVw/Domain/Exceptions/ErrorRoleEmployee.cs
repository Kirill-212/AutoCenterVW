namespace Domain.Exceptions
{
    public class ErrorRoleEmployee : BadRequestException
    {
        public ErrorRoleEmployee()
            : base("You cannot change this user if the user has the wrong role")
        {
        }
    }
}
