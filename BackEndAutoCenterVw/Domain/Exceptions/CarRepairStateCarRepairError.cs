namespace Domain.Exceptions
{
    public class CarRepairStateCarRepairError : BadRequestException
    {
        public CarRepairStateCarRepairError(string state)
            : base($"Error: Car repair alrey found with state car repair {state}.")
        {
        }
    }
}