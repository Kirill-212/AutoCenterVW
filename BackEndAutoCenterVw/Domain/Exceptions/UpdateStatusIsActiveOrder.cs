using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
    public class UpdateStatusIsActiveOrder : BadRequestException
    {
        public UpdateStatusIsActiveOrder()
            : base($"Error: Еhis car cannot be upgraded because her father-in-law has order/orders.")
        {
        }
    }
}

