using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class Employee
    {
        public DateTime StartWorkDate { get; set; }

        public string Address { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        [JsonIgnore]
        public List<New> News { get; set; }

        [JsonIgnore]
        public List<CarRepair> CarRepairs { get; set; }
    }
}
