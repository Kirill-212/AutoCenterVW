using AutoMapper;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [Route("api/roles")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public RolesController(IServiceManager serviceManager,
            IMapper _mapper
            )
        {
            _serviceManager = serviceManager;
        }

        //  [Authorize(Roles = " ADMIN")]
        [HttpGet]
        public async Task<IEnumerable<Role>> GetAll()
        {
            return await _serviceManager.AsyncServiceRole.GetAll();
        }
    }
}
