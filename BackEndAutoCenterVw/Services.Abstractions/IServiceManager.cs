using Contracts;
using Domain.FilterHelper;
using Domain.Models;

namespace Services.Abstractions
{
    public interface IServiceManager
    {
        IAsyncServiceUser<User> AsyncServiceUser { get; }

        IAsyncServiceRole<Role> AsyncServiceRole { get; }

        IAsyncServiceEmployee<Employee> AsyncServiceEmployee { get; }

        IAsyncServiceNew<New, Img, GetNewDto> AsyncServiceNew { get; }

        IAsyncServiceCar<Car, ImgCar, GetCarDto,FilterCarEmail> AsyncServiceCar { get; }

        IAsyncServiceClientCar<ClientCar> AsyncServiceClientCar { get; }

        IAsyncServiceOrder<Order> AsyncServiceOrder { get; }

        IAsyncServiceTestDrive<TestDrive> AsyncServiceTestDrive { get; }

        IAsyncServiceCarRepair<CarRepair> AsyncServiceCarRepair { get; }

        IAsyncServiceVerifyUser<User> AsyncServiceVerifyUser { get; }

        IMailService AsyncMailService { get; }
    }
}
