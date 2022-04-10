using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
    public class PayError : BadRequestException
    {
        public PayError()
            : base($"Error:Зayment was not successful. Try again later")
        {
        }
    }
}