namespace Domain.Exceptions
{
    public class CarEquipmentNotFound : BadRequestException
    {
        public CarEquipmentNotFound(string name)
            : base($"Error: car equipment name {name} not found.")
        {
        }
    }
}