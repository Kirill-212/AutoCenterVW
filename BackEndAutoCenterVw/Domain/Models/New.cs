using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class New
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime Created { get; set; }

        public bool IsDeleted { get; set; }

        public string Description { get; set; }

        public int EmployeeId { get; set; }

        public Employee Employee { get; set; }


        public List<Img> Imgs { get; set; }
    }
}
