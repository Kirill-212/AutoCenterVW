using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public class GetCarDto
    {
        public Car Car {get; set;}

        public User User {get; set;}
    }
}
