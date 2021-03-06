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
    [Route("api/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        private readonly IMapper _mapper;

        public EmployeesController(IServiceManager serviceManager,
            IMapper _mapper
            )
        {
            this._mapper = _mapper;
            _serviceManager = serviceManager;
        }

        [Authorize(Roles = "SUPER_ADMIN")]
        [HttpGet("byUser/email")]
        public async Task<GetEmployeeDto> GetbyUserEmail([FromQuery] string email)
        {
            return _mapper.Map<GetEmployeeDto>(
                await _serviceManager.AsyncServiceEmployee.FindByUserEmail(email)
                );
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN")]
        [HttpGet]
        public async Task<List<GetEmployeeDto>> GetAll()
        {
            return _mapper.Map<List<GetEmployeeDto>>(
                await _serviceManager.AsyncServiceEmployee.GetAll()
                );
        }


        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("carrepair")]
        public async Task<List<GetEmployeeDto>> GetCarRepairEmp()
        {
            return _mapper.Map<List<GetEmployeeDto>>(
                await _serviceManager.AsyncServiceEmployee.GetCarPeraitEmp()
                );
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN")]
        [HttpGet("{id}")]
        public async Task<GetEmployeeDto> GetbyId(int id)
        {
            return _mapper.Map<GetEmployeeDto>(
                await _serviceManager.AsyncServiceEmployee.FindById(id)
                );
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PostEmployeeDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceEmployee.Create(
                    _mapper.Map<Employee>(item)
                    , item.RoleName,
                    item.Email
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN")]
        [HttpPut]
        public async Task<ActionResult> Put([FromBody] PutEmployeeDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceEmployee.Update(
                    _mapper.Map<Employee>(item),
                    item.RoleName,
                    item.Email
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN")]
        [HttpDelete]
        public async Task<ActionResult> Delete(string email)
        {
            await _serviceManager.AsyncServiceEmployee.Remove(email);

            return NoContent();
        }
    }
}
