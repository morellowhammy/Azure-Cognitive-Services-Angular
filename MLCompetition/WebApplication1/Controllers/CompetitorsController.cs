using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Domain;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompetitorsController : ControllerBase
    {
        private readonly ICompetitorService _competitorService;

        public CompetitorsController(ICompetitorService competitorService)
        {
            _competitorService = competitorService;
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
