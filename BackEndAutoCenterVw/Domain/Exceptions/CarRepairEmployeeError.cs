namespace Domain.Exceptions
{
    public class CarRepairEmployeeError : BadRequestException
    {
        public CarRepairEmployeeError(string email)
             : base($"Error: Employee with this email not found {email}.")
        {
        }
    }
}