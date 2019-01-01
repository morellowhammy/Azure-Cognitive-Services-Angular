using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Domain;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompetitorsController : ControllerBase
    {
        private ICompetitorService _competitorService;

        private ICompetitorService CompetitorService => _competitorService ?? (this._competitorService = new CompetitorService());

        // GET api/competitors
        [HttpGet]
        public ActionResult<IEnumerable<Competitor>> Get()
        {
            return new ActionResult<IEnumerable<Competitor>>(CompetitorService.GetCompetitors());
        }

        // GET api/competitors/pepe
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/competitors
        [HttpPost]
        public ActionResult Post([FromBody] Competitor competitor)
        {
            var compt = CompetitorService.AddCompetitor(competitor);

            if (compt == null)
            {
                return NotFound();
            }

            return Ok(compt);
        }

        // DELETE api/competitors/pepe
        [HttpDelete("{name}")]
        public ActionResult Delete(string name)
        {
            CompetitorService.DeleteCompetitor(name);
            return Ok();
        }
    }
}
