using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
    public class UpdateStatusIsActiveTestDrive : BadRequestException
    {
        public UpdateStatusIsActiveTestDrive()
            : base($"Error: Еhis car cannot be upgraded because her father-in-law has test drive/drives.")
        {
        }
    }
}
