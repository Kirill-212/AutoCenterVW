using Domain.Models;

namespace Contracts
{
    public class GetCarDto
    {
        public Car Car {get; set;}

        public decimal TotalCost { get; set;}

        public User User {get; set;}
    }
}
