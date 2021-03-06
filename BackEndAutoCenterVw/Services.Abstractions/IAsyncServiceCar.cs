using AutoMapper;
using Domain.Pagination;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Services.Abstractions
{
    public interface IAsyncServiceCar<T, K,C,D,Q>
    {
        Task Create(
            T item,
            List<K> imgCar,
            int? sharePercentage,
            string nameCarEquipment,
            CancellationToken cancellationToken = default
            );

        Task<IEnumerable<T>> GetAll(CancellationToken cancellationToken = default);

        Task<T> GetById(int id, CancellationToken cancellationToken = default);

        Task Update(
            T item,
            int? sharePercentage,
            string nameCarEquipment = null,
            string newVin = null,
            CancellationToken cancellationToken = default
            );

        Task Remove(string vin, CancellationToken cancellationToken = default);

        Task Remove(string vin,string email, CancellationToken cancellationToken = default);

        Task<T> GetByVin(string vin, CancellationToken cancellationToken = default);

        Task<IEnumerable<T>> GetWithoutClientCar(CancellationToken cancellationToken = default);

        Task<IEnumerable<T>> GetCarForUser(CancellationToken cancellationToken = default);

        Task<IEnumerable<T>> GetCarByEmail(
            string email,
            CancellationToken cancellationToken = default
            );

        Task UpdateStatus(string vin, CancellationToken cancellationToken = default);

        Task<IEnumerable<T>> GetCarActive();

        PagedListCar< C> GetAllPaged(PagedParameters item,Q filterAllCar, IMapper mapper);
        PagedListCar< C> GetByEmailPaged(PagedParameters item, string email, D filterCarEmail, IMapper mapper);

        List<C> FilteringClientCar(List<C> data,
            D filter
            );

        List<C> FilteringCar(List<C> data,
            Q filter
            );
    }
}
