using AutoMapper;
using Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [Route("api/carrepairs")]
    [ApiController]
    public class CarRepairsController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        private readonly IMapper _mapper;

        public CarRepairsController(IServiceManager serviceManager,
            IMapper _mapper
            )
        {
            this._mapper = _mapper; _serviceManager = serviceManager;
        }


        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PostCarRepairDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceCarRepair.Create(
                    item.EmailOwner,
                    item.Email,
                    item.Vin,
                    item.Description
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [Authorize(Roles = "SERVICE_EMPLOYEE")]
        [HttpPut("cancel")]
        public async Task<ActionResult> UpdateStateForCancel(
            [FromBody] UpdateStateCarRepairDto item
            )
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceCarRepair.UpdateStateForCancel
                    (
                    item.EmailEmployee,
                    item.Vin
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpPut("cancel/user")]
        public async Task<ActionResult> UpdateStateForCancelUser(
            [FromBody] UpdateStateCarRepairDto item,
            [FromQuery] string email
            )
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceCarRepair.UpdateStateForCancelUser
                    (email,
                    item.EmailEmployee,
                    item.Vin
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [Authorize(Roles = "SERVICE_EMPLOYEE")]
        [HttpPut("endWork")]
        public async Task<ActionResult> UpdateStateEndWork(
            [FromBody] UpdateStateCarRepairDto item
            )
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceCarRepair.UpdateStateForEndWork
                    (

                    item.EmailEmployee,
                    item.Vin
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [Authorize(Roles = "SERVICE_EMPLOYEE")]
        [HttpPut("startWork")]
        public async Task<ActionResult> UpdateStateStartWork(
            [FromBody] UpdateStateCarRepairForStartWorkDto item
            )
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceCarRepair.UpdateStateForStartWork
                     (
                      item.StartWork,
                    item.EndWork,
                    item.EmailEmployee,
                    item.Vin
                     );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [Authorize(Roles = "SERVICE_EMPLOYEE")]
        [HttpPost("sendNotification")]
        public async Task<ActionResult> SendNotification(
           [FromQuery] string email
           )
        {
            await _serviceManager.AsyncMailService.SendEmailAsync(email);
            return Ok();
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("user")]
        public async Task<List<GetCarRepairDto>> GetForUser([FromQuery] string email)
        {
            return _mapper.Map<List<GetCarRepairDto>>(await _serviceManager.AsyncServiceCarRepair.GetForUser(email));
        }


        [Authorize(Roles = "SERVICE_EMPLOYEE")]
        [HttpGet("employee")]
        public async Task<List<GetCarRepairDto>> GetForEmployee([FromQuery] string email)
        {
            return _mapper.Map<List<GetCarRepairDto>>(await _serviceManager.AsyncServiceCarRepair.GetForEmployee(email));
        }

        [Authorize(Roles = "SERVICE_EMPLOYEE")]
        [HttpGet("all/by/email")]
        public async Task<List<GetCarRepairDto>> GetForEmployeeByEmail([FromQuery] string email)
        {
            return _mapper.Map<List<GetCarRepairDto>>(await _serviceManager.AsyncServiceCarRepair.GetByEmailCarRepairs(email));
        }
    }
}
