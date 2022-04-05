using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<IEnumerable<Role>> GetWithourUser()
        {
            return await _context.Roles
                .Where(i=>i.RoleName!=Roles.USER.ToString())
                .ToListAsync();
        }
    }
}
