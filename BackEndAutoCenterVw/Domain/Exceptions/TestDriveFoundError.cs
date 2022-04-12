namespace Domain.Exceptions
{
    public class TestDriveFoundError : BadRequestException
    {
        public TestDriveFoundError(string vin)
            : base($"Error: Test drive with this car found {vin}.")
        {
        }
    }
}