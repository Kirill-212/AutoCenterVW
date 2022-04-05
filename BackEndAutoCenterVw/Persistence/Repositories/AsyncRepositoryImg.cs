using Domain.Models;
using Domain.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    internal sealed class AsyncRepositoryImg : AsyncRepository<Img>,
        IAsyncRepositoryImg<Img>
    {
        public AsyncRepositoryImg(RepositoryDbContext dbContext)
            : base(dbContext)
        {
        }

        public async Task AddRange(List<Img> items)
        {
            await _dbContext.AddRangeAsync(items);
        }

        public void DeleteRange(List<Img> items)
        {
            _dbContext.RemoveRange(items);
        }
    }
}
