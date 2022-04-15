using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
   public class TestDriveCancelUserError : BadRequestException
    {
        public TestDriveCancelUserError()
             : base($"Error: You cannot update test drive. State is not PENDING.")
        {
        }
    }
}