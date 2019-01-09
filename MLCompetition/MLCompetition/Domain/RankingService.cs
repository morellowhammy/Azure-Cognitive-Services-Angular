using System.Collections.Generic;
using System.Linq;

namespace MLCompetition.Domain
{
    public class RankingService : IRankingService
    {
        private readonly IList<Game> _games;

        public RankingService()
        {
            _games = new List<Game>();
        }

        public void Play(Competitor competitor)
        {
            // TODO: Iterate through test data
                // TODO: Call Azure Service

            // TODO: Get Score from previous iteration
            double score = 10;

            // Add game score
            var game = _games.FirstOrDefault(x => x.Name == competitor.Name);
            if (game != null)
            {
                game.Attempts++;
                if (game.Score < score)
                {
                    game.Score = score;
                }
            }
            else
            {
                game = new Game
                {
                    Attempts = 1,
                    Score = score,
                    Name = competitor.Name
                };
                _games.Add(game);
            }
        }

        public IEnumerable<Game> GetRanking()
        {
            return _games;
        }
    }
}
