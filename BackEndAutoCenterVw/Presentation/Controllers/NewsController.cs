using AutoMapper;
using Contracts;
using Domain.Models;
using Domain.Pagination;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Services.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [Route("api/news")]
    [ApiController]
    public class NewController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        private readonly IMapper _mapper;

        public NewController(IServiceManager serviceManager,
            IMapper _mapper
            )
        {
            this._mapper = _mapper;
            _serviceManager = serviceManager;
        }

        [HttpGet("paged")]
        public IActionResult GetNewsPaged([FromQuery] PagedParameters ownerParameters)
        {
            var owners = _serviceManager.AsyncServiceNew.GetAllPaged();

            var metadata = new
            {
                owners.TotalCount,
                owners.PageSize,
                owners.CurrentPage,
                owners.TotalPages,
                owners.HasNext,
                owners.HasPrevious
            };

            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));


            return Ok(owners);
        }


        //  [Authorize(Roles = " ADMIN, EMPLOYEE, USER")]
        [HttpGet]
        public async Task<IEnumerable<GetNewDto>> GetAll()
        {
            return _mapper.Map<List<GetNewDto>>(
                await _serviceManager.AsyncServiceNew.GetAll()
                );
        }

        // [Authorize(Roles = " ADMIN, EMPLOYEE")]
        [HttpGet("{id}")]
        public async Task<ActionResult<GetNewDto>> GetbyId(int id)
        {
            return _mapper.Map<GetNewDto>(
                await _serviceManager.AsyncServiceNew.FindById(id)
                );
        }

        //  [Authorize(Roles = " ADMIN, EMPLOYEE")]
        [HttpGet("by/title")]
        public async Task<ActionResult<GetNewDto>> GetbyTitle([FromQuery] string title)
        {
            return _mapper.Map<GetNewDto>(
                await _serviceManager.AsyncServiceNew.GetByTitile(title)
                );
        }

        // [Authorize(Roles = " ADMIN, EMPLOYEE")]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] NewWrapperDto<PostNewDto> item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceNew.Create(
                    _mapper.Map<New>(item.New),
                    item.New.Email,
                    _mapper.Map<List<Img>>(item.Imgs)
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        //  [Authorize(Roles = " ADMIN, EMPLOYEE")]
        [HttpPut]
        public async Task<ActionResult> Put([FromBody] NewWrapperDto<PutNewDto> item)
        {
            if (ModelState.IsValid)
            {
                await _serviceManager.AsyncServiceNew.Update(
                    _mapper.Map<New>(item.New),
                    _mapper.Map<List<Img>>(item.Imgs),
                    item.New.NewTitle
                    );

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // [Authorize(Roles = " ADMIN, EMPLOYEE")]
        [HttpDelete]
        public async Task<ActionResult> Delete([FromQuery] string title)
        {
            await _serviceManager.AsyncServiceNew.Remove(title);

            return NoContent();

        }
    }
}
