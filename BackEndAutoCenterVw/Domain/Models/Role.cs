using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public enum Roles
    {
        ADMIN = 1,
        USER = 2,
        EMPLOYEE = 3,
        SERVICE_EMPLOYEE = 4
    }
    public class Role
    {
        public int Id { get; set; }

        public string RoleName { get; set; }

        [JsonIgnore]
        public List<User> Users { get; set; }
    }
}
