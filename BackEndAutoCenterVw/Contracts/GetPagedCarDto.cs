﻿using Domain.Models;
using Domain.Pagination;

namespace Contracts
{
    public class GetPagedCarDto
    {
        public PagedListCar< GetCarDto> GetCarDto { get; set; }

        public int TotalCount { get; set; }

        public int PageSize { get; set; }

        public int CurrentPage { get; set; }

        public int TotalPages { get; set; }

        public bool HasNext { get; set; }

        public bool HasPrevious { get; set; }
    }
}
