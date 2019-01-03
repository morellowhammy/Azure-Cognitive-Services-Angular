using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    [Route("v1/")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        [Route("version")]
        public ActionResult<string> GetVersion()
        {
            return Ok("1.0.0");
        }

        [HttpGet]
        [Route("about")]
        public ActionResult<string> About()
        {
            return Ok("ML Competition");
        }
    }
}
