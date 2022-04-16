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
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        private readonly IMapper _mapper;

        public OrdersController(IServiceManager serviceManager,
            IMapper _mapper
            )
        {
            this._mapper = _mapper; _serviceManager = serviceManager;
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PostOrderDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceOrder.Create(
                    item.ChangeRegisterNumber,
                    item.VIN, item.EmailOwner,
                    item.EmailBuyer
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpPut("cancel")]
        public async Task<ActionResult> UpdateStateForCancel([FromBody] UpdateStateOrderDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceOrder.UpdateStateForCancel(
                    item.VIN,
                    item.EmailBuyer,
                    item.TotalCost
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
        public async Task<ActionResult> UpdateStateForCancelUser([FromBody] UpdateStateOrderDto item,[FromQuery]string email)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceOrder.UpdateStateForCancelUser(
                    item.VIN,
                    item.EmailBuyer,
                    item.TotalCost
                    , email
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,EMPLOYEE")]
        [HttpPut("confirm")]
        public async Task<ActionResult> UpdateStateForConfirm([FromBody] UpdateStateOrderDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceOrder.UpdateStateForConfirm(
                    item.VIN,
                    item.EmailBuyer,
                    item.TotalCost
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpPut("confirm/user")]
        public async Task<ActionResult> UpdateStateForConfirmUser([FromBody] UpdateStateOrderDto item,[FromQuery] string email)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceOrder.UpdateStateForConfirmUser(
                    item.VIN,
                    item.EmailBuyer,
                    item.TotalCost,
                    email
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpPut("paid")]
        public async Task<ActionResult> UpdateStateForPaid([FromBody] UpdateStateOrderForPaidDto item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceOrder.UpdateStateForPaid(
                    item.VIN,
                    item.EmailBuyer,
                    item.TotalCost,
                    item.CardNumber,
                    item.Month,
                    item.Year,
                    item.CVC,
                  item.CardOwnerName
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("user")]
        public async Task<IEnumerable<Order>> GetForUser([FromQuery] string email)
        {
            return await _serviceManager.AsyncServiceOrder.GetForUser(email);
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("buyer")]
        public async Task<List<GetOrderBuyerDto>> GetForBuyer([FromQuery] string email)
        {
            return _mapper.Map<List<GetOrderBuyerDto>>(await _serviceManager.AsyncServiceOrder.GetForBuyer(email));
        }

        [Authorize(Roles = "SUPER_ADMIN,ADMIN,EMPLOYEE")]
        [HttpGet("employee")]
        public async Task<IEnumerable<Order>> GetForEmployee()
        {
            return await _serviceManager.AsyncServiceOrder.GetForEmployee();
        }
    }
}
