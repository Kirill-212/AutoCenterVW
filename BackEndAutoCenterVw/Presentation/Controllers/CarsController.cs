using AutoMapper;
using Contracts;
using Domain.Models;
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

        //  [Authorize(Roles = " ADMIN, EMPLOYEE, USER")]
        [HttpGet("/update/status")]
        public async Task<ActionResult> UpdateStatus([FromQuery] string vin)
        {
            await _serviceManager.AsyncServiceCar.UpdateStatus(vin);

            return NoContent();
        }

        // [Authorize(Roles = " ADMIN, EMPLOYEE, USER")]
        [HttpGet("/ByEmail")]
        public async Task<IEnumerable<Car>> GetCarByEmail([FromQuery] string email)
        {
            return await _serviceManager.AsyncServiceCar.GetCarByEmail(email);
        }

        // [Authorize(Roles = " ADMIN, EMPLOYEE, USER")]
        //[HttpGet("/ByVinNotAddedEmp")]
        //public async Task<Car> GetByVinNotAddedEmp([FromQuery] string vin)
        //{
        //    return await _serviceManager.AsyncServiceCar.GetByVinNotAddedEmpValidAttr(vin);
        //}

        //[Authorize(Roles = " ADMIN, EMPLOYEE, USER")]
        [HttpGet("user")]
        public async Task<IEnumerable<Car>> GetCarForUser()
        {
            return await _serviceManager.AsyncServiceCar.GetCarForUser();
        }

        //[Authorize(Roles = " ADMIN, EMPLOYEE,  USER")]
        [HttpGet]
        public async Task<IEnumerable<Car>> GetAll()
        {
            return await _serviceManager.AsyncServiceCar.GetAll();
        }

        //   [Authorize(Roles = " ADMIN, EMPLOYEE")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetbyId(int id)
        {
            return await _serviceManager.AsyncServiceCar.GetById(id);


        }

        // [Authorize(Roles = " ADMIN, EMPLOYEE, USER")]
        [HttpGet("without/clientCar")]
        public async Task<IEnumerable<Car>> GetWithoutClientCar()
        {
            return await _serviceManager.AsyncServiceCar.GetWithoutClientCar();
        }

        //  [Authorize(Roles = " ADMIN, EMPLOYEE, USER")]
        [HttpGet("by/vin")]
        public async Task<ActionResult<Car>> GetByVin([FromQuery] string vin)
        {
            return await _serviceManager.AsyncServiceCar.GetByVin(vin);
        }

        // [Authorize(Roles = " ADMIN, EMPLOYEE, USER")]
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

        // [Authorize(Roles = " ADMIN, EMPLOYEE, USER")]
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

        //  [Authorize(Roles = " ADMIN, EMPLOYEE, USER")]
        [HttpDelete]
        public async Task<ActionResult> Delete([FromQuery] string vin)
        {
            await _serviceManager.AsyncServiceCar.Remove(vin);

            return NoContent();
        }
    }
}
