using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class ImgCar
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public int CarId { get; set; }

        [JsonIgnore]
        public Car Car { get; set; }
    }
}
