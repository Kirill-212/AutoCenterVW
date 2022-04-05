using System;

namespace Domain.Models
{
    public enum StateTestDrive
    {
        PENDING,
        CONFIRM,
        CANCEL
    }
    public class TestDrive
    {
        public int Id { get; set; }

        public DateTime DateStart { get; set; }

        public string Time { get; set; }

        public StateTestDrive stateTestDrive { get; set; }

        public int CarId { get; set; }

        public Car Car { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public bool IsActive { get; set; }
    }
}
