using Domain.FilterHelper;
using Domain.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.PaginationFilterParams
{
   public class GetCarsParams: PagedParameters
    {
       public FilterCar FilterCar { get; set; }
    }
}
