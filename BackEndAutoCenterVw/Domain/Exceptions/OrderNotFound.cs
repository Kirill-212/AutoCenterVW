namespace Domain.Exceptions
{
    public class OrderNotFound : BadRequestException
    {
        public OrderNotFound()
            : base("Error: order not found.")
        {
        }
    }
}