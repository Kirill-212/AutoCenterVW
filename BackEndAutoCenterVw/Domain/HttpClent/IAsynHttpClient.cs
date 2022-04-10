using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.HttpClent
{
    public interface IAsynHttpClient<T>
    {
        Task<bool> Post(T item);

    }
}
