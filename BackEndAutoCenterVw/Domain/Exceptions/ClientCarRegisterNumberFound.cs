namespace Domain.Exceptions
{
    public class ClientCarRegisterNumberFound : BadRequestException
    {
        public ClientCarRegisterNumberFound(string registerNumber, string msg = "found")
             : base($"Error: Client car with this register number {msg} {registerNumber}.")
        {
        }
    }
}
