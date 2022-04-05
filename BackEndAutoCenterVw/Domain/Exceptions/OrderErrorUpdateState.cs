namespace Domain.Exceptions
{
    public class OrderErrorUpdateState : BadRequestException
    {
        public OrderErrorUpdateState(string state)
            : base($"You cannot update state order current state is->{state}")
        {
        }
    }
}
