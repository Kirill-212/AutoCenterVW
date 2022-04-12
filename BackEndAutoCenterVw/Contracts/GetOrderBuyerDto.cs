using Domain.Models;

namespace Contracts
{
    public class GetOrderBuyerDto
    {
        public Order Order { get; set; }

        public ClientCar ClientCar { get; set; }


    }
}
