using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    internal sealed class AsyncRepositoryCarRepair :
        AsyncRepository<CarRepair>,
        IAsyncRepositoryCarRepair<CarRepair>
    {
        public AsyncRepositoryCarRepair(RepositoryDbContext dbContext)
            : base(dbContext)
        {
        }

        public async Task<CarRepair> GetByCarRepairParams(CarRepair item)
        {
            return await _dbContext.CarRepairs
                 .Where(i => i.CarId == item.CarId)
                 .Where(i => i.EmployeeId == item.EmployeeId)
                 .Where(i => i.StateCarRepair != StateCarRepair.CANCEL)
                 .Where(i => i.StateCarRepair != StateCarRepair.ENDWORK)
                 .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<CarRepair>> GetCarRepairForEmployee(int idEmployee)
        {
            return await _dbContext.CarRepairs
                .Where(i => i.EmployeeId == idEmployee)
                .Where(i => i.StartWork != null)
                .Where(i => i.EndWork != null)
                .Where(i => i.StateCarRepair != StateCarRepair.CANCEL)
                .Where(i => i.StateCarRepair != StateCarRepair.ENDWORK)
                .ToListAsync();
        }

        public async Task<IEnumerable<CarRepair>> GetForEmployee(string email)
        {
            return await _dbContext.CarRepairs
                .Where(i => i.Employee.User.Email == email)
                .Where(i => i.StateCarRepair != StateCarRepair.CANCEL)
                .Where(i => i.StateCarRepair != StateCarRepair.ENDWORK)
                .ToListAsync();
        }

        public async Task<IEnumerable<CarRepair>> GetForUser(string email)
        {
            return await _dbContext.CarRepairs
                .Where(i => i.Car.ClientCar.User.Email == email)
                .Where(i => i.StateCarRepair != StateCarRepair.CANCEL)
                .Where(i => i.StateCarRepair != StateCarRepair.ENDWORK)
                .ToListAsync();
        }
    }
}
