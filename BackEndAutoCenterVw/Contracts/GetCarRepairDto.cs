using Domain.Models;

namespace Contracts
{
    public class GetCarRepairDto
    {
        public CarRepair CarRepair { get; set; }
        
        public Car Car { get; set; }

        public User CarUser { get; set; }

        public User Emp { get; set; }

    }
}
