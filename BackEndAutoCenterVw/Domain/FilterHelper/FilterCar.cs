using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.FilterHelper
{
    public enum CarFilter
    {
        All,
        ClientCar,
        CarAutoCenter
    }
    public class FilterCar: FilterCarEmail
    {
        public CarFilter FilterAllCar { get; set; }

    }
}
