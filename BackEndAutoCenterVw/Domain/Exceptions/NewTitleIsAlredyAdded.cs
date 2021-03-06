namespace Domain.Exceptions
{
    public class NewTitleIsAlredyAdded : BadRequestException
    {
        public NewTitleIsAlredyAdded(string title)
             : base($"Error: The title alredy is use {title}.")
        {
        }
    }
}
