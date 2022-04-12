namespace Domain.Exceptions
{
    public class CarEquipmentNameAlredyAdded : BadRequestException
    {
        public CarEquipmentNameAlredyAdded(string name)
            : base($"Error: car equipment name alredy added {name}.")
        {
        }
    }
}