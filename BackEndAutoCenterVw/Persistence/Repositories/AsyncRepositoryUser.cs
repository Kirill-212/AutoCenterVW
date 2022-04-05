using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    internal sealed class AsyncRepositoryUser :
        AsyncRepository<User>,
        IAsyncRepositoryUser<User>
    {
        public AsyncRepositoryUser(RepositoryDbContext dbContext)
            : base(dbContext)
        {
        }

        public async Task<IEnumerable<User>> GetAllUsersNotAddedToEmp()
        {
            return await _dbContext.Users.Include(i => i.Employee)
                .Where(i => i.Status != Status.DELETED)
               .Where(r => r.Id != r.Employee.UserId)
               .ToListAsync();
        }

        public override async Task<IEnumerable<User>> Get()
        {
            return await _dbContext.Users
                .Where(i => i.Status != Status.DELETED)
                .Include(i => i.Role).ToListAsync();
        }

        public async Task<User> GetByEmail(string email)
        {
            return await _dbContext.Users.AsNoTracking()
                  .Include(i => i.Role)
                  .Include(i => i.Employee)
                  .Where(i => i.Status != Status.DELETED)
                  .Where(i => i.Email == email)
                  .FirstOrDefaultAsync();
        }

        public override async Task<User> GetById(int id)
        {
            return await _dbContext.Users
              .Where(i => i.Status != Status.DELETED)
              .FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<User> GetActiveUserByEmail(string email)
        {
            return await _dbContext.Users.AsNoTracking()
                 .Include(i => i.Role)
                 .Include(i => i.Employee)
                 .Where(i => i.Status == Status.ACTIVE)
                 .Where(i => i.Email == email)
                 .FirstOrDefaultAsync();
        }    
    }
}
