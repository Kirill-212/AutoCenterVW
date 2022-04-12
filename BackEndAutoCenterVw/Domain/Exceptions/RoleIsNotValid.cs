namespace Domain.Exceptions
{
    public class RoleIsNotValid : BadRequestException
    {
        public RoleIsNotValid()
            : base("Error: Input role is not valid.")
        {
        }
    }
}