using Domain.Models;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IUnitOfWork
    {
        IAsyncRepositoryUser<User> AsyncRepositoryUser { get; }

        IAsyncRepositoryRole<Role> AsyncRepositoryRole { get; }

        IAsyncRepositoryEmployee<Employee> AsyncRepositoryEmployee { get; }

        IAsyncRepositoryNew<New> AsyncRepositoryNew { get; }

        IAsyncRepositoryImg<Img> AsyncRepositoryImg { get; }

        IAsyncRepositoryActionCar<ActionCar> AsyncRepositoryActionCar { get; }

        IAsyncRepositoryCar<Car> AsyncRepositoryCar { get; }

        IAsyncRepositoryClientCar<ClientCar> AsyncRepositoryClientCar { get; }

        IAsyncRepositoryImgCar<ImgCar> AsyncRepositoryImgCar { get; }

        IAsyncRepositoryOrder<Order> AsyncRepositoryOrder { get; }

        IAsyncRepositoryCarRepair<CarRepair> AsyncRepositoryCarRepair { get; }

        IAsyncRepositoryTestDrive<TestDrive> AsyncRepositoryTestDrive { get; }

        Task CompleteAsync();

        void Dispose();
    }
}
