using Microsoft.AspNetCore.Mvc;
using MLCompetition.Interfaces;

namespace MLCompetition.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet]
        [Route("competition-enable")]
        public ActionResult<string> GetCompetitionEnabled()
        {
            return Ok(_adminService.CompetitionEnabled);
        }

        [HttpPost]
        [Route("competition-enable")]
        public ActionResult Post([FromBody] bool competitionEnable)
        {
            _adminService.CompetitionEnabled = competitionEnable;
            return Ok(_adminService.CompetitionEnabled);
        }
    }
}
