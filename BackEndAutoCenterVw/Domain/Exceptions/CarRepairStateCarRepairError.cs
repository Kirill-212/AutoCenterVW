namespace Domain.Exceptions
{
    public class CarRepairStateCarRepairError : BadRequestException
    {
        public CarRepairStateCarRepairError(string state)
            : base($"Car repair alrey found with state car repair {state}")
        {
        }
    }
}