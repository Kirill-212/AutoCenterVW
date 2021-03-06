namespace Domain.Exceptions
{
    public class TestDriveCarError : BadRequestException
    {
        public TestDriveCarError(string vin)
             : base($"Error: Test drive car is not found or selled or this car is client car {vin}.")
        {
        }
    }
}