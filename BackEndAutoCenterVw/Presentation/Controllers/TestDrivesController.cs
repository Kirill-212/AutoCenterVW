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
    [Route("api/testdrives")]
    [ApiController]
    public class TestDrivesController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        private readonly IMapper _mapper;

        public TestDrivesController(IServiceManager serviceManager,
            IMapper _mapper
            )
        {
            this._mapper = _mapper; _serviceManager = serviceManager;
        }

        [Authorize(Roles = "ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TestDriveDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceTestDrive.Create
                    (
                    item.Email,
                    item.Vin,
                    item.Time.ToString(),
                    item.DateStart
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "ADMIN,EMPLOYEE")]
        [HttpPut("cancel")]
        public async Task<ActionResult> UpdateStateForCancel([FromBody] TestDriveDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceTestDrive.UpdateStateForCancel
                    (
                    item.Email,
                    item.Vin,
                    item.Time.ToString(),
                    item.DateStart
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpPut("cancel/user")]
        public async Task<ActionResult> UpdateStateForCancelUser([FromBody] TestDriveDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceTestDrive.UpdateStateForCancelUser
                    (
                    item.Email,
                    item.Vin,
                    item.Time.ToString(),
                    item.DateStart
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "ADMIN,EMPLOYEE")]
        [HttpPut("confirm")]
        public async Task<ActionResult> UpdateStateForConfirm([FromBody] TestDriveDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceTestDrive.UpdateStateForConfirm
                     (
                     item.Email,
                     item.Vin,
                     item.Time.ToString(),
                     item.DateStart
                     );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("user")]
        public async Task<IEnumerable<TestDrive>> GetForUser([FromQuery] string email)
        {
            return await _serviceManager.AsyncServiceTestDrive.GetForUser(email);
        }

        [Authorize(Roles = "ADMIN,EMPLOYEE")]
        [HttpGet("employee")]
        public async Task<IEnumerable<TestDrive>> GetForEmployee()
        {
            return await _serviceManager.AsyncServiceTestDrive.GetForEmployee();
        }
    }
}
