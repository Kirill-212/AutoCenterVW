using Contracts;
using Domain.FilterHelper;
using Domain.HttpClent;
using Domain.MailSettings;
using Domain.Models;
using Domain.Models.CarEquipment;
using Domain.Repositories;
using Microsoft.Extensions.Options;
using Services.Abstractions;
using System;

namespace Services
{
    public sealed class ServiceManager : IServiceManager
    {
        private readonly Lazy<IAsyncServiceUser<User>> _lazyAsyncServiceUser;

        private readonly Lazy<IAsyncServiceRole<Role>> _lazyAsyncServiceRole;

        private readonly Lazy<IAsyncServiceEmployee<Employee>> _lazyAsyncServiceEmployee;

        private readonly Lazy<IAsyncServiceNew<New, Img, GetNewDto>> _lazyAsyncServiceNew;

        private readonly Lazy<IAsyncServiceCar<Car, ImgCar, GetCarDto, FilterCarEmail>> _lazyAsyncServiceCar;

        private readonly Lazy<IAsyncServiceClientCar<ClientCar>> _lazyAsyncServiceClientCar;

        private readonly Lazy<IAsyncServiceOrder<Order>> _lazyAsyncServiceOrder;

        private readonly Lazy<IAsyncServiceTestDrive<TestDrive>> _lazyAsyncServiceTestDrive;

        private readonly Lazy<IAsyncServiceCarRepair<CarRepair>> _lazyAsyncServiceCarRepair;

        private readonly Lazy<IAsyncServiceVerifyUser<User>> _lazyAsyncServiceVerifyUser;

        private readonly Lazy<IMailService> _lazyAsyncMailService;

        public ServiceManager(

            IUnitOfWork unitOfWork,
            IAsyncRepositoryCarEquipment<CarEquipment> carEquipment,
            IAsynHttpClient<PayDataDto> asynHttpClient,
            IOptions<MailSetting> mailSettings
            )
        {
            _lazyAsyncServiceUser = new Lazy<IAsyncServiceUser<User>>(
                () => new AsyncServiceUser(unitOfWork)
                );
            _lazyAsyncServiceRole = new Lazy<IAsyncServiceRole<Role>>(
                () => new AsyncServiceRole(unitOfWork)
                );
            _lazyAsyncServiceEmployee = new Lazy<IAsyncServiceEmployee<Employee>>(
                () => new AsyncServiceEmployee(unitOfWork)
                );
            _lazyAsyncServiceNew = new Lazy<IAsyncServiceNew<New, Img, GetNewDto>>(
               () => new AsyncServiceNew(unitOfWork)
               );
            _lazyAsyncServiceCar = new Lazy<IAsyncServiceCar<Car, ImgCar, GetCarDto, FilterCarEmail>>(
                () => new AsyncServiceCar(unitOfWork, carEquipment)
                );
            _lazyAsyncServiceClientCar = new Lazy<IAsyncServiceClientCar<ClientCar>>(
                () => new AsyncServiceClientCar(unitOfWork, carEquipment)
                );
            _lazyAsyncServiceOrder = new Lazy<IAsyncServiceOrder<Order>>(
                () => new AsyncServiceOrder(unitOfWork, carEquipment, asynHttpClient)
                );
            _lazyAsyncServiceTestDrive = new Lazy<IAsyncServiceTestDrive<TestDrive>>(
                () => new AsyncServiceTestDrive(unitOfWork)
                );
            _lazyAsyncServiceCarRepair = new Lazy<IAsyncServiceCarRepair<CarRepair>>(
                () => new AsyncServiceCarRepair(unitOfWork)
                );
            _lazyAsyncServiceVerifyUser = new Lazy<IAsyncServiceVerifyUser<User>>(
                () => new AsyncServiceVerifyUser(unitOfWork)
                );
            _lazyAsyncMailService = new Lazy<IMailService>(
                () => new AsyncMailService(mailSettings)
                );
        }
        public IAsyncServiceUser<User> AsyncServiceUser => _lazyAsyncServiceUser.Value;

        public IAsyncServiceRole<Role> AsyncServiceRole => _lazyAsyncServiceRole.Value;

        public IAsyncServiceEmployee<Employee> AsyncServiceEmployee =>
            _lazyAsyncServiceEmployee.Value;

        public IAsyncServiceNew<New, Img, GetNewDto> AsyncServiceNew => _lazyAsyncServiceNew.Value;

        public IAsyncServiceCar<Car, ImgCar, GetCarDto, FilterCarEmail> AsyncServiceCar => _lazyAsyncServiceCar.Value;

        public IAsyncServiceClientCar<ClientCar> AsyncServiceClientCar =>
            _lazyAsyncServiceClientCar.Value;

        public IAsyncServiceOrder<Order> AsyncServiceOrder => _lazyAsyncServiceOrder.Value;

        public IAsyncServiceTestDrive<TestDrive> AsyncServiceTestDrive =>
            _lazyAsyncServiceTestDrive.Value;

        public IAsyncServiceCarRepair<CarRepair> AsyncServiceCarRepair =>
            _lazyAsyncServiceCarRepair.Value;

        public IAsyncServiceVerifyUser<User> AsyncServiceVerifyUser =>
            _lazyAsyncServiceVerifyUser.Value;
        public IMailService AsyncMailService =>
            _lazyAsyncMailService.Value;
    }
}
