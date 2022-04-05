using Domain.Models;
using Domain.Repositories;
using System;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly RepositoryDbContext dbContext;

        private readonly Lazy<IAsyncRepositoryUser<User>> _lazyAsyncRepositoryUser;

        private readonly Lazy<IAsyncRepositoryRole<Role>> _lazyAsyncRepositoryRole;

        private readonly Lazy<IAsyncRepositoryEmployee<Employee>> _lazyAsyncRepositoryEmployee;

        private readonly Lazy<IAsyncRepositoryNew<New>> _lazyAsyncRepositoryNew;

        private readonly Lazy<IAsyncRepositoryImg<Img>> _lazyAsyncRepositoryImg;

        private readonly Lazy<IAsyncRepositoryActionCar<ActionCar>> _lazyAsyncRepositoryActionCar;

        private readonly Lazy<IAsyncRepositoryCar<Car>> _lazyAsyncRepositoryCar;

        private readonly Lazy<IAsyncRepositoryClientCar<ClientCar>> _lazyAsyncRepositoryClientCar;

        private readonly Lazy<IAsyncRepositoryImgCar<ImgCar>> _lazyAsyncRepositoryImgCar;

        private readonly Lazy<IAsyncRepositoryOrder<Order>> _lazyAsyncRepositoryOrder;

        private readonly Lazy<IAsyncRepositoryTestDrive<TestDrive>> _lazyAsyncRepositoryTestDrive;

        private readonly Lazy<IAsyncRepositoryCarRepair<CarRepair>> _lazyAsyncRepositoryCarRepair;

        public UnitOfWork(RepositoryDbContext dbContext)
        {
            this.dbContext = dbContext;

            _lazyAsyncRepositoryUser = new Lazy<IAsyncRepositoryUser<User>>(
                () => new AsyncRepositoryUser(dbContext)
                );
            _lazyAsyncRepositoryRole = new Lazy<IAsyncRepositoryRole<Role>>(
                () => new AsyncRepositoryRole(dbContext)
                );
            _lazyAsyncRepositoryEmployee = new Lazy<IAsyncRepositoryEmployee<Employee>>(
                () => new AsyncRepositoryEmployee(dbContext)
                );
            _lazyAsyncRepositoryNew = new Lazy<IAsyncRepositoryNew<New>>(
               () => new AsyncRepositoryNew(dbContext)
               );
            _lazyAsyncRepositoryImg = new Lazy<IAsyncRepositoryImg<Img>>(
                () => new AsyncRepositoryImg(dbContext)
                );
            _lazyAsyncRepositoryActionCar = new Lazy<IAsyncRepositoryActionCar<ActionCar>>(
                () => new AsyncRepositoryActionCar(dbContext)
                );
            _lazyAsyncRepositoryCar = new Lazy<IAsyncRepositoryCar<Car>>(
                () => new AsyncRepositoryCar(dbContext)
                );
            _lazyAsyncRepositoryClientCar = new Lazy<IAsyncRepositoryClientCar<ClientCar>>(
                () => new AsyncRepositoryClientCar(dbContext)
                );
            _lazyAsyncRepositoryImgCar = new Lazy<IAsyncRepositoryImgCar<ImgCar>>(
                () => new AsyncRepositoryImgCar(dbContext)
                );
            _lazyAsyncRepositoryOrder = new Lazy<IAsyncRepositoryOrder<Order>>(
                () => new AsyncRepositoryOrder(dbContext)
                );
            _lazyAsyncRepositoryCarRepair = new Lazy<IAsyncRepositoryCarRepair<CarRepair>>(
                () => new AsyncRepositoryCarRepair(dbContext)
                );
            _lazyAsyncRepositoryTestDrive = new Lazy<IAsyncRepositoryTestDrive<TestDrive>>(
                () => new AsyncRepositoryTestDrive(dbContext)
                );
        }
        public IAsyncRepositoryUser<User> AsyncRepositoryUser => _lazyAsyncRepositoryUser.Value;

        public IAsyncRepositoryRole<Role> AsyncRepositoryRole => _lazyAsyncRepositoryRole.Value;

        public IAsyncRepositoryEmployee<Employee> AsyncRepositoryEmployee => _lazyAsyncRepositoryEmployee.Value;

        public IAsyncRepositoryNew<New> AsyncRepositoryNew => _lazyAsyncRepositoryNew.Value;

        public IAsyncRepositoryImg<Img> AsyncRepositoryImg => _lazyAsyncRepositoryImg.Value;

        public IAsyncRepositoryActionCar<ActionCar> AsyncRepositoryActionCar => _lazyAsyncRepositoryActionCar.Value;

        public IAsyncRepositoryCar<Car> AsyncRepositoryCar => _lazyAsyncRepositoryCar.Value;

        public IAsyncRepositoryClientCar<ClientCar> AsyncRepositoryClientCar => _lazyAsyncRepositoryClientCar.Value;

        public IAsyncRepositoryImgCar<ImgCar> AsyncRepositoryImgCar => _lazyAsyncRepositoryImgCar.Value;

        public IAsyncRepositoryOrder<Order> AsyncRepositoryOrder => _lazyAsyncRepositoryOrder.Value;

        public IAsyncRepositoryTestDrive<TestDrive> AsyncRepositoryTestDrive => _lazyAsyncRepositoryTestDrive.Value;

        public IAsyncRepositoryCarRepair<CarRepair> AsyncRepositoryCarRepair => _lazyAsyncRepositoryCarRepair.Value;

        public async Task CompleteAsync()
        {
            await dbContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            dbContext.Dispose();
        }
    }
}
