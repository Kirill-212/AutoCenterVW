using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    internal sealed class AsyncRepositoryTestDrive :
       AsyncRepository<TestDrive>,
       IAsyncRepositoryTestDrive<TestDrive>
    {
        public AsyncRepositoryTestDrive(RepositoryDbContext dbContext)
            : base(dbContext)
        {
        }

        public async Task<TestDrive> GetByCarRepairParams(TestDrive item)
        {
            return await _dbContext.TestDrives
                  .Where(i => i.CarId == item.CarId)
                  .Where(i => i.UserId == item.UserId)
                  .Where(i => i.IsActive == item.IsActive)
                  .Where(i => i.DateStart == item.DateStart)
                  .Where(i => i.Time == item.Time)
                  .Where(i => i.stateTestDrive != StateTestDrive.CANCEL)
                  .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<TestDrive>> GetForEmployee()
        {
            return await _dbContext.TestDrives
                .Include(i=>i.User)
                .Include(i => i.Car)
                .Where(i => i.stateTestDrive != StateTestDrive.CANCEL)
                .ToListAsync();
        }

        public async Task<IEnumerable<TestDrive>> GetForUser(string email)
        {
            return await _dbContext.TestDrives
                 .Include(i => i.User)
                .Include(i => i.Car)
                 .Where(i => i.User.Email == email)
                  .Where(i => i.stateTestDrive != StateTestDrive.CANCEL)
                 .ToListAsync();
        }
    }
}
