using System;

namespace Contracts
{
    public class GetEmployeeDto
    {
        public DateTime StartWorkDate { get; set; }

        public string Address { get; set; }

        public GetUserDto GetUserDto { get; set; }
    }
}
