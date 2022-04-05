using AutoMapper;
using Contracts;
using Domain.Models;
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

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PostCarRepairDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceCarRepair.Create(
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

        [HttpGet("user")]
        public async Task<IEnumerable<CarRepair>> GetForUser([FromQuery] string email)
        {
            return await _serviceManager.AsyncServiceCarRepair.GetForUser(email);
        }



        [HttpGet("employee")]
        public async Task<IEnumerable<CarRepair>> GetForEmployee([FromQuery] string email)
        {
            return await _serviceManager.AsyncServiceCarRepair.GetForEmployee(email);
        }
    }
}
