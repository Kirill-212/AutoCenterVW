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
            : base($"Error: This car cannot be update because he have car test drive/drives.")
        {
        }
    }
}
