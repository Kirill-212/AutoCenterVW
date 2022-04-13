using AutoMapper;
using Contracts;
using Domain.Models.CarEquipment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [Route("api/carequipments")]
    [ApiController]
    public class CarEquipmentController : ControllerBase
    {
        private readonly IMapper mapper;

        private readonly IAsyncServiceCarEquipmentForm<CarEquipmentForm> equipmentForm;

        private readonly IAsyncServiceCarEquipment<CarEquipment> equipment;
        // private readonly IAsyncServiceCarEquipment<CarEquipment> asyncService;

        public CarEquipmentController(
            IMapper mapper,
            IAsyncServiceCarEquipmentForm<CarEquipmentForm> equipmentForm
            , IAsyncServiceCarEquipment<CarEquipment> equipment
            )
        {
            this.equipment = equipment;
            this.mapper = mapper;
            this.equipmentForm = equipmentForm;
        }

        [Authorize(Roles = "ADMIN,EMPLOYEE")]
        [HttpPost]
        public async Task<ActionResult> PostCarEquipmentForm(
            [FromBody] PostCarEquipmentFormDto item
            )
        {
            if (ModelState.IsValid)
            {
                await equipmentForm.Create(mapper.Map<CarEquipmentForm>(item));

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "ADMIN,EMPLOYEE")]
        [HttpDelete]
        public async Task<ActionResult> DeleteCarEquipmentForm(
            [FromQuery] string name
            )
        {
            await equipmentForm.Remove(name);

            return NoContent();
        }

        [Authorize(Roles = "ADMIN,EMPLOYEE")]
        [HttpPut]
        public async Task<ActionResult> PutCarEquipmentForm(
            [FromBody] PutCarEquipmentFormDto item
            )
        {
            if (ModelState.IsValid)
            {
                await equipmentForm.Update(mapper.Map<CarEquipmentForm>(item), item.NewName);

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        //[Authorize(Roles = " ADMIN, EMPLOYEE")]
        [HttpGet("{id}")]
        public ActionResult<CarEquipmentFormDto> GetById(string id)
        {
            return mapper.Map<CarEquipmentFormDto>(equipmentForm.GetById(id));
        }

        [Authorize(Roles = "ADMIN,EMPLOYEE")]
        [HttpGet("name")]
        public ActionResult<CarEquipmentFormDto> GetByNameForm([FromQuery] string name)
        {
            return mapper.Map<CarEquipmentFormDto>(equipmentForm.GetByName(name));
        }

        [Authorize(Roles = "ADMIN,EMPLOYEE")]
        [HttpGet("form")]
        public List<CarEquipmentFormDto> GetForm()
        {
            return mapper.Map<List<CarEquipmentFormDto>>(equipmentForm.GetAll());
        }

        [Authorize(Roles = "ADMIN,EMPLOYEE")]
        [HttpPost("equipment")]
        public async Task<ActionResult> Post([FromBody] PostCarEquipmentDto item)
        {
            if (ModelState.IsValid)
            {
                await equipment.Create(mapper.Map<CarEquipment>(item));

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "ADMIN,EMPLOYEE")]
        [HttpDelete("equipment")]
        public async Task<ActionResult> Delete([FromQuery] string name)
        {
            await equipment.Remove(name);
            return NoContent();
        }

        //[Authorize(Roles = " ADMIN, EMPLOYEE")]
        [HttpPut("equipment")]
        public async Task<ActionResult> Put([FromBody] PutCarEquipmentDto item)
        {
            if (ModelState.IsValid)
            {
                await equipment.Update(mapper.Map<CarEquipment>(item), item.NewName);

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("equipment")]
        public IEnumerable<CarEquipment> GetAll()
        {
            return equipment.GetAll();
        }

        //[Authorize(Roles = " ADMIN, EMPLOYEE,  USER")]
        [HttpGet("equipment/name")]
        public CarEquipment GetByName([FromQuery] string name)
        {
            return equipment.GetByName(name);
        }

        [Authorize(Roles = "ADMIN,USER,EMPLOYEE,SERVICE_EMPLOYEE")]
        [HttpGet("equipment/{id}")]
        public CarEquipment GetByIdCarEquipment(string id)
        {
            return equipment.GetById(id);
        }
    }
}

