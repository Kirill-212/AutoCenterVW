namespace Domain.Exceptions
{
    public class RoleIsNotValid : BadRequestException
    {
        public RoleIsNotValid()
            : base("Input role is not valid")
        {
        }
    }
}