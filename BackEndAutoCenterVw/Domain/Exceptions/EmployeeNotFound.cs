namespace Domain.Exceptions
{
    public class EmployeeNotFound : BadRequestException
    {
        public EmployeeNotFound(string email)
             : base($"Employee with this email not found {email}")
        {
        }
    }
}

