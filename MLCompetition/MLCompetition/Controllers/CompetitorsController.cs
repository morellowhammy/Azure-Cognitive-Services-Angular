using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MLCompetition.Domain;

namespace MLCompetition.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class CompetitorsController : ControllerBase
    {
        private readonly ICompetitorService _competitorService;

        private readonly IRankingService _rankingService;

        public CompetitorsController(ICompetitorService competitorService, IRankingService rankingService)
        {
            _competitorService = competitorService;
            _rankingService = rankingService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Competitor>> Get()
        {
            var competitors = _competitorService.GetCompetitors();

            if (competitors.Any())
            {
                return Ok(competitors);
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult Post([FromBody] Competitor competitor)
        {
            var compt = _competitorService.AddCompetitor(competitor);
            _rankingService.Play(competitor);

            if (compt == null)
            {
                return NotFound();
            }

            return Ok(compt);
        }

        [HttpDelete("{name}")]
        public ActionResult Delete(string name)
        {
            _competitorService.DeleteCompetitor(name);
            return Ok();
        }
    }
}
