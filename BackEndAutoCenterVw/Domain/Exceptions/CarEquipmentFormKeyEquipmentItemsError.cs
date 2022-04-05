namespace Domain.Exceptions
{
    public class CarEquipmentFormKeyEquipmentItemsError : BadRequestException
    {
        public CarEquipmentFormKeyEquipmentItemsError(string key)
             : base($"Error car equipment the keys are repeated {key}")
        {
        }
    }
}
