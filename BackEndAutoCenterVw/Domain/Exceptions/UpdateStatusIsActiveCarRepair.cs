using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
    public class UpdateStatusIsActiveCarRepair : BadRequestException
    {
        public UpdateStatusIsActiveCarRepair()
            : base($"Error: Еhis car cannot be upgraded because her father-in-law has car repair/repairs.")
        {
        }
    }
}
