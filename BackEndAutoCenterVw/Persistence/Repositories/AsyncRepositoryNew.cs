using Domain.Models;
using Domain.Pagination;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    internal sealed class AsyncRepositoryNew : AsyncRepository<New>,
        IAsyncRepositoryNew<New>
    {
        public AsyncRepositoryNew(RepositoryDbContext dbContext)
             : base(dbContext)
        {
        }

        public async Task<New> GetByTitle(string title)
        {
            return await _dbContext.News.Include(i => i.Imgs)
                .Where(i => i.IsDeleted == false)
                .Include(u => u.Employee.User)
                .Where(i => i.Title == title)
                .FirstOrDefaultAsync();
        }

        public override async Task<IEnumerable<New>> Get()
        {
            return await _dbContext.News
                .Include(i => i.Employee.User)
                .Include(i => i.Imgs)
                .Where(i => i.IsDeleted == false)
                .ToListAsync();
        }

        public override async Task<New> GetById(int id)
        {
            return await _dbContext.News
                .Include(i => i.Imgs)
                .Include(i => i.Employee.User)
                .Where(i => i.IsDeleted == false)
                .FirstOrDefaultAsync(i => i.Id == id);
        }

        public IQueryable<New> GetPaged()
        {
            return _dbContext.News
                .Include(i => i.Imgs)
                 .Include(i => i.Employee.User)
                .Where(i => i.IsDeleted == false)              
                .AsQueryable();
        }
    }
}
