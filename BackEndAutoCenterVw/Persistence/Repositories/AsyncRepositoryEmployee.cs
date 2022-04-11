using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    internal sealed class AsyncRepositoryEmployee : AsyncRepository<Employee>,
        IAsyncRepositoryEmployee<Employee>
    {
        public AsyncRepositoryEmployee(RepositoryDbContext dbContext)
            : base(dbContext)
        {
        }

        public async Task<Employee> FindByIdUser(int id)
        {
            return await _dbContext.Employees
                .Include(i => i.User)
                 .Where(i => i.User.Status != Status.DELETED)
                 .Where(i => i.UserId == id)
                 .FirstOrDefaultAsync();
        }

        public override async Task<IEnumerable<Employee>> Get()
        {
            return await _dbContext.Employees
                .Include(i => i.User.Role)
                .Where(i => i.User.Status != Status.DELETED)
                .ToListAsync();
        }

        public async Task<Employee> FindByUserEmail(string email)
        {
            return await _dbContext.Employees
                .AsNoTracking()
                .Include(i => i.User)
                .Where(i => i.User.Status != Status.DELETED)
                .Where(u => u.User.Email == email)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Employee>> GetCarRepairEmp()
        {
            return await _dbContext.Employees
               .Include(i => i.User.Role)
               .Where(i=>i.User.Role.Id==(int)Roles.SERVICE_EMPLOYEE)
               .Where(i => i.User.Status != Status.DELETED)
               .ToListAsync();
        }
    }
}
