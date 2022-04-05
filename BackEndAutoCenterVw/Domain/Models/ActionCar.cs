using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class ActionCar
    {
        public int Id { get; set; }

        public int SharePercentage { get; set; }

        [JsonIgnore]
        public List<Car> Cars { get; set; }
    }
}
