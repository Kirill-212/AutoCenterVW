using System;

namespace Domain.Models
{
    public enum StateCarRepair
    {
        PENDING,
        STARTWORK,
        ENDWORK,
        CANCEL
    }
    public class CarRepair
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public int CarId { get; set; }

        public Car Car { get; set; }

        public int EmployeeId { get; set; }

        public Employee Employee { get; set; }

        public DateTime? StartWork { get; set; }

        public DateTime? EndWork { get; set; }

        public StateCarRepair StateCarRepair { get; set; }
    }
}
