namespace Domain.Exceptions
{
    public class NewNotFound : BadRequestException
    {
        public NewNotFound(string title)
             : base($"Error: New with this title not found {title}.")
        {
        }
    }
}