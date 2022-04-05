﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.CarEquipment
{
    public class CarEquipmentForm
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        public string Name { get; set; }

        public bool IsDeleted { get; set; }

        public List<ValueCarEquipment> EquipmentItems { get; set; }
    }
}
