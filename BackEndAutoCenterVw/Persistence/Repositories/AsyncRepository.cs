using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    internal class AsyncRepository<T> : IAsyncRepository<T> where T : class
    {
        protected readonly RepositoryDbContext _dbContext;

        private readonly DbSet<T> _dbSet;

        public AsyncRepository(RepositoryDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }

        public async Task Create(T item)
        {
            await _dbSet.AddAsync(item);
        }

        public virtual async Task<IEnumerable<T>> Get()
        {
            return await _dbSet.ToListAsync();
        }

        public virtual async Task<T> GetById(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public void Update(T item)
        {
            _dbContext.Entry(item).State = EntityState.Modified;

        }
    }
}
