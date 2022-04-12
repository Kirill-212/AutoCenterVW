namespace Domain.Exceptions
{
    public class TestDriveNotFound : BadRequestException
    {
        public TestDriveNotFound()
            : base($"Error: Test drive not found.")
        {
        }
    }
}