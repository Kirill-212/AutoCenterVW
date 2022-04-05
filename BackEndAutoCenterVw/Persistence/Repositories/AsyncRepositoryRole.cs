using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    internal sealed class AsyncRepositoryRole : IAsyncRepositoryRole<Role>
    {
        private readonly RepositoryDbContext _context;

        public AsyncRepositoryRole(RepositoryDbContext db)
        {
            _context = db;
        }

        public async Task<IEnumerable<Role>> GetAll()
        {
            return await _context.Roles.ToListAsync();
        }
    }
}
