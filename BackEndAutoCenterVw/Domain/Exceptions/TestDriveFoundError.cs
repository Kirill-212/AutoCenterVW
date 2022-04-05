namespace Domain.Exceptions
{
    public class TestDriveFoundError : BadRequestException
    {
        public TestDriveFoundError(string vin)
            : base($"Test drive car is found {vin}")
        {
        }
    }
}