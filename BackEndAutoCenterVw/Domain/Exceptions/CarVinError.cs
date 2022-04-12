namespace Domain.Exceptions
{
    public class CarVinError : BadRequestException
    {
        public CarVinError(string vin)
            : base($"Error: Car with this vin not found or owner client or not selled {vin}.")
        {
        }
    }
}