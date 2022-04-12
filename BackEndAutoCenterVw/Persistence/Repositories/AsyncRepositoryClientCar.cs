using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    internal sealed class AsyncRepositoryClientCar :
        AsyncRepository<ClientCar>,
        IAsyncRepositoryClientCar<ClientCar>
    {
        public AsyncRepositoryClientCar(RepositoryDbContext dbContext)
            : base(dbContext)
        {
        }

        public async Task<ClientCar> GetByRegisterNumber(string registerNumber)
        {
            return await _dbContext.ClientCars
                .Include(i => i.Car)
                .Where(i => i.Car.IsDeleted == false)
                .Where(i => i.RegisterNumber == registerNumber)
                .FirstOrDefaultAsync();
        }

        public override async Task<IEnumerable<ClientCar>> Get()
        {
            return await _dbContext.ClientCars
                .Include(i => i.Car.ActionCar)
                .Include(i => i.User)
                .Include(i => i.Car.ImgsCar)
                .Where(i => i.Car.IsDeleted == false)
                .ToListAsync();
        }

        public override async Task<ClientCar> GetById(int id)
        {
            return await _dbContext.ClientCars
                 .Include(i => i.Car.ActionCar)
                 .Include(i => i.User)
                 .Where(i => i.Id == id)
                 .Where(i => i.Car.IsDeleted == false)
                 .FirstOrDefaultAsync();
        }

        public async Task<ClientCar> GetCarByCarVinWithEmail(string vin, string email)
        {
            return await _dbContext.ClientCars
                  .Include(i => i.Car.ActionCar)
                  .Include(i => i.Car.ImgsCar)
                  .Include(i => i.User)
                  .Where(i => i.Car.VIN == vin)
                  .Where(i => i.User.Email == email)
                  .Where(i => i.Car.IsDeleted == false)
                  .FirstOrDefaultAsync();
        }

        public async Task<ClientCar> GetCarByVin(string vin)
        {
            return await _dbContext.ClientCars
               .Include(i => i.Car.ActionCar)
               .Include(i => i.User)
               .Include(i => i.Car.ImgsCar)
               .Where(i => i.Car.VIN == vin)
               .Where(i => i.Car.IsDeleted == false)
               .FirstOrDefaultAsync();
        }
    }
}
