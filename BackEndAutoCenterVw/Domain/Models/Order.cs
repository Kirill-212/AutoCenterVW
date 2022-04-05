using System;

namespace Domain.Models
{
    public enum State
    {
        PENDING,
        CONFIRM,
        CANCEL,
        PAID
    }
    public class Order
    {
        public int Id { get; set; }

        public decimal TotalCost { get; set; }

        public DateTime? DateOfBuyCar { get; set; }

        public int CarId { get; set; }

        public Car Car { get; set; }

        public State State { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }

        public bool ChangeRegisterNumber { get; set; }
    }
}
