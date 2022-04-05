namespace Domain.Models
{
    public class ClientCar
    {
        public int Id { get; set; }

        public string RegisterNumber { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public int CarId { get; set; }

        public Car Car { get; set; }

    }
}
