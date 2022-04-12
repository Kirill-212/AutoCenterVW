namespace Domain.Exceptions
{
    public class CarRepairNotFound : BadRequestException
    {
        public CarRepairNotFound()
            : base("Error: car repair not found.")
        {
        }
    }
}