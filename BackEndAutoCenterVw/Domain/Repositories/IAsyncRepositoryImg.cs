﻿using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAsyncRepositoryImg<T> : IAsyncRepository<T>
    {
        void DeleteRange(List<T> items);

        Task AddRange(List<T> items);
    }
}
