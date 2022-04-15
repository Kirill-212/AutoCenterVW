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
            : base($"Error: This car cannot be update because he have car order/orders.")
        {
        }
    }
}

