using AutoMapper;
using Contracts;
using Domain.Models;
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

        [HttpGet("user")]
        public async Task<IEnumerable<TestDrive>> GetForUser([FromQuery] string email)
        {
            return await _serviceManager.AsyncServiceTestDrive.GetForUser(email);
        }



        [HttpGet("employee")]
        public async Task<IEnumerable<TestDrive>> GetForEmployee()
        {
            return await _serviceManager.AsyncServiceTestDrive.GetForEmployee();
        }
    }
}
