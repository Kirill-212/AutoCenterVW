using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    internal sealed class AsyncRepositoryCar :
        AsyncRepository<Car>,
        IAsyncRepositoryCar<Car>
    {
        public AsyncRepositoryCar(RepositoryDbContext dbContext)
            : base(dbContext)
        {
        }

        public override async Task<IEnumerable<Car>> Get()
        {
            return await _dbContext.Cars
                .Include(i => i.ActionCar)
                .Include(i => i.ClientCar.User)
                .Include(i => i.ImgsCar)
                .Where(i => i.IsDeleted == false)
                .ToListAsync();
        }

        public override async Task<Car> GetById(int id)
        {
            return await _dbContext.Cars
                .Include(i => i.ActionCar)
                .Include(i => i.ClientCar.User)
                .Include(i => i.ImgsCar)
                .Where(i => i.IsDeleted == false)
                .Where(i => i.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<Car> GetByVin(string vin)
        {
            return await _dbContext.Cars
                .Include(i => i.ActionCar)
                .Include(i => i.ClientCar.User)
                .Include(i => i.ImgsCar)
                .Where(i => i.VIN == vin)
                .Where(i => i.IsDeleted == false)
                .FirstOrDefaultAsync();
        }

        public void UpdateRange(List<Car> items)
        {
            items.ForEach(m => _dbContext.Entry(m).State = EntityState.Modified);

        }

        public async Task<IEnumerable<Car>> GetWithoutClientCar()
        {
            return await _dbContext.Cars
                .Include(i => i.ActionCar)
                .Include(i => i.ClientCar.User)
                .Include(i => i.ImgsCar)
                .Where(i => i.ClientCar == null)
                .Where(i => i.IsDeleted == false)
                .ToListAsync();
        }

        public async Task<Car> GetByVinNotAddedEmp(string vin)
        {
            return await _dbContext.Cars
                .Include(i => i.ActionCar)
                .Include(i => i.ClientCar.User)
                .Include(i => i.ImgsCar)
                .Where(i => i.VIN == vin)
                .Where(i => i.IsDeleted == false)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Car>> GetCarForUser()
        {
            return await _dbContext.Cars
                .Include(i => i.ActionCar)
                .Include(i => i.ClientCar.User)
                .Include(i => i.ImgsCar)
                .Where(u => u.ClientCar == null)
                .Where(i => i.IsDeleted == false)
                .ToListAsync();
        }

        public async Task<IEnumerable<Car>> GetCarByEmail(string email)
        {
            return await _dbContext.Cars
                .Include(i => i.ActionCar)
                .Include(i => i.ClientCar.User)
                .Include(i => i.ImgsCar)
                .Where(i => i.ClientCar.User.Status != Status.DELETED)
                .Where(u => u.ClientCar.User.Email == email)
                .Where(i => i.IsDeleted == false)
                .ToListAsync();
        }

        public async Task<Car> GetCarByVinForOrder(string vin)
        {
            return await _dbContext.Cars
                .Include(i => i.ActionCar)
                .Include(i => i.ClientCar.User)
                .Where(i => i.ClientCar == null)
                .Where(u => u.VIN == vin)
                .Where(i => i.IsDeleted == false)
                .FirstOrDefaultAsync();
        }

        public async Task<Car> GetCarByVinAndEmailForOrder(string vin, string email)
        {
            return await _dbContext.Cars
                .Include(i => i.ActionCar)
                .Include(i => i.ClientCar.User)
                .Where(i => i.ClientCar.User.Email == email)
                .Where(u => u.VIN == vin)
                .Where(i => i.IsDeleted == false)
                .FirstOrDefaultAsync();
        }
    }
}
