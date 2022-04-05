using Domain.Models;
using Domain.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    internal sealed class AsyncRepositoryImgCar : AsyncRepository<ImgCar>,
        IAsyncRepositoryImgCar<ImgCar>
    {
        public AsyncRepositoryImgCar(RepositoryDbContext dbContext)
            : base(dbContext)
        {
        }

        public async Task AddRange(List<ImgCar> items)
        {
            await _dbContext.AddRangeAsync(items);
        }

        public void DeleteRange(List<ImgCar> items)
        {
            _dbContext.RemoveRange(items);
        }
    }
}

