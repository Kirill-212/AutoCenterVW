namespace Domain.Exceptions
{
    public class CarVinWithEmailFound : BadRequestException
    {
        public CarVinWithEmailFound(string vin,string email, string msg = "found")
            : base($"Error: Car with this vin {msg} {vin} or {email} not valid.")
        {
        }
    }
}