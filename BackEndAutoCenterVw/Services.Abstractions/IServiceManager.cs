using Contracts;
using Domain.Models;
using Domain.Pagination;

namespace Services.Abstractions
{
    public interface IServiceManager
    {
        IAsyncServiceUser<User> AsyncServiceUser { get; }

        IAsyncServiceRole<Role> AsyncServiceRole { get; }

        IAsyncServiceEmployee<Employee> AsyncServiceEmployee { get; }

        IAsyncServiceNew<New, Img,GetNewDto> AsyncServiceNew { get; }

        IAsyncServiceCar<Car, ImgCar, GetCarDto> AsyncServiceCar { get; }

        IAsyncServiceClientCar<ClientCar> AsyncServiceClientCar { get; }

        IAsyncServiceOrder<Order> AsyncServiceOrder { get; }

        IAsyncServiceTestDrive<TestDrive> AsyncServiceTestDrive { get; }

        IAsyncServiceCarRepair<CarRepair> AsyncServiceCarRepair { get; }

        IAsyncServiceVerifyUser<User> AsyncServiceVerifyUser { get; }
    }
}
