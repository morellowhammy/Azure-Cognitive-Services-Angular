using Microsoft.AspNetCore.Mvc;

namespace MLCompetition.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private bool _competitionEnabled = true;

        [HttpGet]
        [Route("competition-enable")]
        public ActionResult<string> GetCompetitionEnabled()
        {
            return Ok(_competitionEnabled);
        }

        [HttpPost]
        [Route("competition-enable")]
        public ActionResult Post([FromBody] bool competitionEnable)
        {
            this._competitionEnabled = competitionEnable;
            return Ok(_competitionEnabled);
        }
    }
}
