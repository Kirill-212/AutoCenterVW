namespace Domain.Exceptions
{
    public class ValueCarEquipmentIsNotValid : BadRequestException
    {
        public ValueCarEquipmentIsNotValid(string cost, string value)
             : base($"Error car equipment form item is not valid value  cost->[{cost}] value->[{value}]")
        {
        }
    }
}