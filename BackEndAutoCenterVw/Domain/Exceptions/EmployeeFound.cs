namespace Domain.Exceptions
{
    public class EmployeeFound : BadRequestException
    {
        public EmployeeFound(string email)
             : base($"Error: Employee with this email found {email}.")
        {
        }
    }
}

