namespace Domain.Exceptions
{
    public class CarVinFound : BadRequestException
    {
        public CarVinFound(string vin,string msg="found")
             : base($"Error: Car with this vin {msg} {vin}.")
        {
        }
    }
}