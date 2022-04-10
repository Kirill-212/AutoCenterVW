using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    internal sealed class AsyncRepositoryOrder :
        AsyncRepository<Order>,
        IAsyncRepositoryOrder<Order>
    {
        public AsyncRepositoryOrder(RepositoryDbContext dbContext)
             : base(dbContext)
        {
        }

        public override async Task<IEnumerable<Order>> Get()
        {
            return await _dbContext.Orders
                .Include(i => i.Car.ClientCar.User)
                .ToListAsync();
        }

        public async Task<Order> GetByOrderParams(Order item)
        {
            return await _dbContext.Orders
                    .Where(i => i.CarId == item.CarId)
                    .Where(i => i.TotalCost == item.TotalCost)
                    .Where(i => i.State != State.PAID)
                    .Where(i => i.State != State.CANCEL)
                    .Where(i => i.UserId == item.UserId)
                    .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Order>> GetForBuyer(string email)
        {
            return await _dbContext.Orders
                            .Include(i => i.Car)
                            .Include(i => i.User)
                            .Include(i=>i.Car.ClientCar.User)
                            .Where(i => i.Car.IsDeleted == false)
                            .Where(i => i.State != State.CANCEL)
                            .Where(i => i.State != State.PAID)
                            .Where(i => i.User.Email == email)
                            .ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetForEmployee()
        {
            return await _dbContext.Orders
                 .Include(i => i.Car)
                 .Include(i => i.User)
                 .Where(i => i.Car.ClientCar == null)
                 .Where(i => i.Car.IsDeleted == false)
                 .Where(i => i.State != State.CANCEL)
                 .Where(i => i.State != State.PAID)
                 .ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetForUser(string email)
        {
            return await _dbContext.Orders
                    .Include(i => i.Car)
                    .Include(i => i.User)
                    .Where(i => i.Car.IsDeleted == false)
                    .Where(i => i.State != State.CANCEL)
                    .Where(i => i.State != State.PAID)
                    .Where(i => i.Car.ClientCar.User.Email == email)
                    .ToListAsync();
        }
    }
}
