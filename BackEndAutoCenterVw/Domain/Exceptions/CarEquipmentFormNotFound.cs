namespace Domain.Exceptions
{
    public class CarEquipmentFormNotFound : BadRequestException
    {
        public CarEquipmentFormNotFound(string name)
            : base($"Error car equipment form name {name} not found")
        {
        }
    }
}