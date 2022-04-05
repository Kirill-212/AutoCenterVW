using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class Car
    {
        public int Id { get; set; }

        public string IdCarEquipment { get; set; }

        public string VIN { get; set; }

        public decimal Cost { get; set; }

        public long CarMileage { get; set; }

        public DateTime DateOfRealeseCar { get; set; }

        [JsonIgnore]
        public ClientCar ClientCar { get; set; }

        [JsonIgnore]
        public List<Order> Orders { get; set; }

        public int? ActionCarId { get; set; }

        public ActionCar ActionCar { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public List<ImgCar> ImgsCar { get; set; }

        [JsonIgnore]
        public List<TestDrive> TestsDrives { get; set; }

        [JsonIgnore]
        public List<CarRepair> CarRepairs { get; set; }
    }
}
