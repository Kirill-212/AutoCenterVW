namespace Domain.Exceptions
{
    public class ObjectIsActiveException : BadRequestException
    {
        public ObjectIsActiveException(string obj)
            : base($"The {obj} is not active")
        {
        }
    }

}
