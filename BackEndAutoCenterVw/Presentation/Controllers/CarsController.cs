using AutoMapper;
using Contracts;
using Domain.FilterHelper;
using Domain.Models;
using Domain.Pagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [Route("api/cars")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        private readonly IMapper _mapper;

        public CarsController(IServiceManager serviceManager,
            IMapper _mapper
            )
        {
            this._mapper = _mapper;
            _serviceManager = serviceManager;
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,EMPLOYEE")]
        [HttpGet("/update/status")]
        public async Task<ActionResult> UpdateStatus([FromQuery] string vin)
        {
            await _serviceManager.AsyncServiceCar.UpdateStatus(vin);

            return NoContent();
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("/active")]
        public async Task<List<GetCarDto>> GetCarActive()
        {
            return _mapper.Map<List<GetCarDto>>(await _serviceManager.AsyncServiceCar.GetCarActive());
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("/ByEmail")]
        public async Task<IEnumerable<Car>> GetCarByEmail([FromQuery] string email)
        {
            return await _serviceManager.AsyncServiceCar.GetCarByEmail(email);
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("/email/paged")]
        public GetPagedCarDto GetCarsPagedByEmail([FromQuery] PagedParameters pagedParameters, string email, [FromQuery] FilterCarEmail filter
            )
        {
            var pageds = _serviceManager.AsyncServiceCar.GetByEmailPaged(pagedParameters, email,filter, _mapper);
            GetPagedCarDto getPagedNewDto = new()
            {
                GetCarDto = pageds,
                TotalCount = pageds.TotalCount,
                PageSize = pageds.PageSize,
                CurrentPage = pageds.CurrentPage,
                TotalPages = pageds.TotalPages,
                HasNext = pageds.HasNext,
                HasPrevious = pageds.HasPrevious
            };
            return getPagedNewDto;
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("user")]
        public async Task<IEnumerable<Car>> GetCarForUser()
        {
            return await _serviceManager.AsyncServiceCar.GetCarForUser();
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("paged")]
        public GetPagedCarDto GetCarsPaged([FromQuery] PagedParameters pagedParameters)
        {
            var pageds = _serviceManager.AsyncServiceCar.GetAllPaged(pagedParameters, _mapper);
            GetPagedCarDto getPagedNewDto = new()
            {
                GetCarDto = pageds,
                TotalCount = pageds.TotalCount,
                PageSize = pageds.PageSize,
                CurrentPage = pageds.CurrentPage,
                TotalPages = pageds.TotalPages,
                HasNext = pageds.HasNext,
                HasPrevious = pageds.HasPrevious
            };
            return getPagedNewDto;
        }

        [HttpGet("email/paged")]
        public GetPagedCarDto GetCarsPaged([FromQuery] PagedParameters pagedParameters, string email)
        {
            var pageds = _serviceManager.AsyncServiceCar.GetAllPaged(pagedParameters, _mapper);
            GetPagedCarDto getPagedNewDto = new()
            {
                GetCarDto = pageds,
                TotalCount = pageds.TotalCount,
                PageSize = pageds.PageSize,
                CurrentPage = pageds.CurrentPage,
                TotalPages = pageds.TotalPages,
                HasNext = pageds.HasNext,
                HasPrevious = pageds.HasPrevious
            };
            return getPagedNewDto;
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet]
        public async Task<List<GetCarDto>> GetAll()
        {
            return _mapper.Map<List<GetCarDto>>(await _serviceManager.AsyncServiceCar.GetAll());
        }

        [Authorize(Roles = "SUPER_ADMIN")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetbyId(int id)
        {
            return await _serviceManager.AsyncServiceCar.GetById(id);


        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,EMPLOYEE")]
        [HttpGet("without/clientCar")]
        public async Task<IEnumerable<Car>> GetWithoutClientCar()
        {
            return await _serviceManager.AsyncServiceCar.GetWithoutClientCar();
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("by/vin")]
        public async Task<ActionResult<Car>> GetByVin([FromQuery] string vin)
        {
            return await _serviceManager.AsyncServiceCar.GetByVin(vin);
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,EMPLOYEE")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PostCarDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceCar.Create(
                    _mapper.Map<Car>(item),
                    _mapper.Map<List<ImgCar>>(item.Imgs),
                    item.SharePercentage,
                    item.NameCarEquipment
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,EMPLOYEE")]
        [HttpPut]
        public async Task<ActionResult> Put([FromBody] PutCarDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceCar.Update(
                    _mapper.Map<Car>(item),
                    item.SharePercentage,
                    item.NameCarEquipment,
                    item.NewVIN
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,EMPLOYEE")]
        [HttpDelete]
        public async Task<ActionResult> Delete([FromQuery] string vin)
        {
            await _serviceManager.AsyncServiceCar.Remove(vin);

            return NoContent();
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpDelete("clientcar")]
        public async Task<ActionResult> Delete([FromQuery] string vin,string email)
        {
            await _serviceManager.AsyncServiceCar.Remove(vin,email);

            return NoContent();
        }
    }
}
