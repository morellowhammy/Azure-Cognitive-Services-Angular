using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MLCompetition.Dtos;
using MLCompetition.Interfaces;

namespace MLCompetition.Controllers
{
    [Route("v1/[controller]")]
    public class RankingController : Controller
    {
        private readonly IRankingService _rankingService;

        public RankingController(IRankingService rankingService)
        {
            _rankingService = rankingService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Game>> Get()
        {
            var ranking = _rankingService.GetRanking();

            if (ranking!=null)
            {
                return Ok(ranking);
            }

            return NotFound();
        }
    }
}
