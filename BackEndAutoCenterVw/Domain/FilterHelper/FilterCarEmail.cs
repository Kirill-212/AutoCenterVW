using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.FilterHelper
{
    public enum StateCell
    {
        ALL,
        SELL,
        NOT_SELL
    }
    public class FilterCarEmail
    {
        public string Vin { get; set; }

        public decimal? TotalCostFrom { get; set; }

        public decimal? TotalCostBefore { get; set; }

        public decimal? CarMileageFrom { get; set; }

        public decimal? CarMileageBefore { get; set; }

        public StateCell Cell { get; set; }

        public DateTime? DateOfRealeseCarFrom { get; set; }

        public DateTime? DateOfRealeseCarBefore { get; set; }
    }
}
