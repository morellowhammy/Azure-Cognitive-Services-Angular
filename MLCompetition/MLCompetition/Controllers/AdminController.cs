using Microsoft.AspNetCore.Mvc;
using MLCompetition.Interfaces;

namespace MLCompetition.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IScoreService _scoreService;

        public AdminController(
            IAdminService adminService,
            IScoreService scoreService)
        {
            _adminService = adminService;
            _scoreService = scoreService;
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

        [HttpGet]
        [Route("num-scoring-tests")]
        public ActionResult<string> GetNumberOfScoringTests()
        {
            return Ok(_scoreService.NumberOfTests);
        }

        [HttpPost]
        [Route("num-scoring-tests")]
        public ActionResult PostNumberOfScoringTests([FromBody] int numberOfScoringTests)
        {
            _scoreService.NumberOfTests = numberOfScoringTests;
            return Ok(_scoreService.NumberOfTests);
        }
    }
}
