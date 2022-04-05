using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public enum Status
    {
        CREATED,
        ACTIVE,
        DELETED,
    }

    public class User
    {
        public int Id { get; set; }

        public string UrlPhoto { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Surname { get; set; }

        public DateTime DBay { get; set; }

        public Status Status { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public int RoleId { get; set; }

        public Employee Employee { get; set; }

        public Role Role { get; set; }

        [JsonIgnore]
        public List<ClientCar> ClientsCars { get; set; }

        [JsonIgnore]
        public List<Order> Orders { get; set; }

        [JsonIgnore]
        public List<TestDrive> TestsDrives { get; set; }

    }
}
