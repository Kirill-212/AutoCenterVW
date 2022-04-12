namespace Domain.Exceptions
{
    public class PayError : BadRequestException
    {
        public PayError()
            : base($"Error: Payment was not successful. Try again later")
        {
        }
    }
}