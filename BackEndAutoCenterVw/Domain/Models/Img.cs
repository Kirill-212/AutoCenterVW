using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class Img
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public int NewId { get; set; }

        [JsonIgnore]
        public New New { get; set; }
    }
}
