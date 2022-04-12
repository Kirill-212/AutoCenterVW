namespace Domain.Exceptions
{
    public class CarEquipmentFormNameAlredyUse : BadRequestException
    {
        public CarEquipmentFormNameAlredyUse(string name)
             : base($"Error: car equipment name form alredy added {name}.")
        {
        }
    }
}
