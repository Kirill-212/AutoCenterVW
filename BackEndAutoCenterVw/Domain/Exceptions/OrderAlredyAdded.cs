namespace Domain.Exceptions
{
    public class OrderAlredyAdded : BadRequestException
    {
        public OrderAlredyAdded(string state)
             : base($"Error: order alredy added with stat {state}  cancel order then create.")
        {
        }
    }
}