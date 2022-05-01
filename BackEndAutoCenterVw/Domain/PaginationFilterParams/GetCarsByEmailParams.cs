using Domain.FilterHelper;
using Domain.Pagination;

namespace Domain.PaginationFilterParams
{
    public class GetCarsByEmailParams : PagedParameters
    {
        public FilterCarEmail  FilterCarEmail { get; set; }
    }
}
