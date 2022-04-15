using AutoMapper;
using Contracts;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [Route("api/clientcars")]
    [ApiController]
    public class ClientCarsController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        private readonly IMapper _mapper;

        public ClientCarsController(IServiceManager serviceManager,
            IMapper _mapper
            )
        {
            this._mapper = _mapper;
            _serviceManager = serviceManager;
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PostClientCarDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceClientCar.Create(
                    _mapper.Map<ClientCar>(item),
                    item.Email,
                    item.PostCarDto.SharePercentage,
                    item.PostCarDto.NameCarEquipment
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
        public async Task<ActionResult> Put([FromBody] PutClientCarDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceClientCar.Update(
                    _mapper.Map<ClientCar>(item),
                    item.PutCarDto.SharePercentage,
                    item.Email, item.NewEmail,
                    item.NewRegisterNumber,
                    item.PutCarDto.NameCarEquipment,
                    item.ChangeRegisterNumber,
                    item.PutCarDto.NewVIN
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpPut("clientcar")]
        public async Task<ActionResult> PutClient([FromBody] PutClientCarDto item,[FromQuery] string email)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceClientCar.UpdateForUser(
                    _mapper.Map<ClientCar>(item),
                    item.PutCarDto.SharePercentage,
                    item.Email, item.NewEmail,
                    item.NewRegisterNumber,
                    email,
                    item.PutCarDto.NameCarEquipment,
                    item.ChangeRegisterNumber,
                    item.PutCarDto.NewVIN
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,EMPLOYEE")]
        [HttpGet]
        public async Task<IEnumerable<ClientCar>> GetAll()
        {
            return await _serviceManager.AsyncServiceClientCar.GetAll();
        }

        // [Authorize(Roles = "ADMIN, EMPLOYEE")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientCar>> GetbyId(int id)
        {
            return await _serviceManager.AsyncServiceClientCar.GetById(id);
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("vin")]
        public async Task<ActionResult<ClientCar>> GetByVin([FromQuery]string vin)
        {
            return await _serviceManager.AsyncServiceClientCar.GetCarByVin(vin);
        }

        // [Authorize(Roles = "ADMIN, EMPLOYEE,USER")]
        [HttpDelete]
        public async Task<ActionResult> DeleteByRegisterNumber([FromQuery] string registerNumber)
        {
            await _serviceManager.AsyncServiceClientCar.Remove(registerNumber);

            return NoContent();
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("/emailWithVin")]
        public async Task<ActionResult<ClientCar>> GetByEmailWithVin([FromQuery] string email,string vin){
            return await _serviceManager.AsyncServiceClientCar.GetByEmailWithVin(email, vin);
        }
    }
}
