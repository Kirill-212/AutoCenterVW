using Microsoft.AspNetCore.Mvc;
using ServicePay.Dto;

namespace ServicePay.Controllers
{
    [ApiController]
    [Route("api/CheckPay")]
    public class CheckPayController : ControllerBase
    {

        [HttpPost]
        public ActionResult Post(PayDataDto item)
        {
            return Ok(item);
        }
    }
}
