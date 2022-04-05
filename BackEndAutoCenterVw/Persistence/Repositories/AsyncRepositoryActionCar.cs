using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    internal sealed class AsyncRepositoryActionCar :
    AsyncRepository<ActionCar>,
    IAsyncRepositoryActionCar<ActionCar>
    {
        public AsyncRepositoryActionCar(RepositoryDbContext dbContext)
            : base(dbContext)
        {
        }

        public void DeleteRange(List<ActionCar> items)
        {
            _dbContext.RemoveRange(items);

        }

        public async Task<ActionCar> GetBySharePercentage(int sharePercentage)
        {
            return await _dbContext.ActionCars
                .Where(i => i.SharePercentage == sharePercentage)
                .FirstOrDefaultAsync();
        }
    }

}
