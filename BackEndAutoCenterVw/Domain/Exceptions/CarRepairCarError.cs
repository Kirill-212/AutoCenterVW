namespace Domain.Exceptions
{
    public class CarRepairCarError : BadRequestException
    {
        public CarRepairCarError(string vin)
            : base($"Error: Car with this vin not found or car selled or car is not client car {vin}.")
        {
        }
    }
}