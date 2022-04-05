namespace Domain.Exceptions
{
    public class ClientCarRegisterNumberFound : BadRequestException
    {
        public ClientCarRegisterNumberFound(string registerNumber, string msg = "found")
             : base($"Client car with this register number {msg} {registerNumber}")
        {
        }
    }
}
