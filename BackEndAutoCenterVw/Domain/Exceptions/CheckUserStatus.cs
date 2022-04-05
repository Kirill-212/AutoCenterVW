namespace Domain.Exceptions
{
    public class CheckUserStatus : BadRequestException
    {
        public CheckUserStatus(string status)
            : base($"User status is not valid {status}")
        {
        }
    }
}
