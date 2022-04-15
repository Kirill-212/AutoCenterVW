using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
    public class EmployeeFound : BadRequestException
    {
        public EmployeeFound(string email)
             : base($"Error: Employee with this email found {email}.")
        {
        }
    }
}

