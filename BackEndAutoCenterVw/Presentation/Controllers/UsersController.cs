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
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        private readonly IMapper _mapper;

        public UsersController(IServiceManager serviceManager,
            IMapper _mapper
            )
        {
            this._mapper = _mapper; _serviceManager = serviceManager;
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN")]
        [HttpGet("notAddedTo/employee")]
        public async Task<List<GetUserDto>> GetAllUsersNotAddedToEmp()
        {
            return _mapper.Map<List<GetUserDto>>(
                await _serviceManager.AsyncServiceUser.GetAllUsersNotAddedToEmp()
                );
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("by/email")]
        public async Task<GetUserDto> GetUserByEmail([FromQuery] string email)
        {
            return _mapper.Map<GetUserDto>(
                await _serviceManager.AsyncServiceUser.GetByEmail(email)
                );
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet]
        public async Task<List<GetUserDto>> GetAll()
        {
            return _mapper.Map<List<GetUserDto>>(
                await _serviceManager.AsyncServiceUser.GetAll()
                );
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("{id}")]
        public async Task<GetUserDto> GetbyId(int id)
        {
            return _mapper.Map<GetUserDto>(
                await _serviceManager.AsyncServiceUser.FindById(id)
                );
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PostUserDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceUser
                    .Create(_mapper.Map<User>(item));

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,EMPLOYEE")]
        [HttpPut]
        public async Task<ActionResult> Put([FromBody] PutUserDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceUser.Update(
                    _mapper.Map<User>(item), item.NewUrlPhoto, item.NewEmail, item.NewPassword);

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpPut("user")]
        public async Task<ActionResult> Put([FromBody] PutUserDto item,[FromQuery]string email)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceUser.UpdateForUser(
                    _mapper.Map<User>(item),email, item.NewUrlPhoto, item.NewEmail, item.NewPassword);

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN")]
        [HttpPut("update/status")]
        public async Task<IActionResult> PutStatus([FromQuery] string email)
        {
            await _serviceManager.AsyncServiceUser.UpdateStatusByEmail(email);

            return NoContent();
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN")]
        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] string email)
        {
            await _serviceManager.AsyncServiceUser.Remove(email);

            return NoContent();
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("active")]
        public async Task<List<GetUserDto>> GetAllActive()
        {
            return _mapper.Map<List<GetUserDto>>(
                await _serviceManager.AsyncServiceUser.GetAllActive()
                );
        }
    }
}
