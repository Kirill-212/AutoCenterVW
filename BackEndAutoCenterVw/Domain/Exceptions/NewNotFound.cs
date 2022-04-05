namespace Domain.Exceptions
{
    public class NewNotFound : BadRequestException
    {
        public NewNotFound(string title)
             : base($"New with this title not found {title}")
        {
        }
    }
}