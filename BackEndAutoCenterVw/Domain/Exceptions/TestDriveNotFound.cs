namespace Domain.Exceptions
{
    public class TestDriveNotFound : BadRequestException
    {
        public TestDriveNotFound()
            : base($"Test drive not found")
        {
        }
    }
}