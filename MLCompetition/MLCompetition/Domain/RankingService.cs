using System.Collections.Generic;
using System.Linq;
using MLCompetition.Dtos;
using MLCompetition.Interfaces;

namespace MLCompetition.Domain
{
    public class RankingService : IRankingService
    {
        private readonly IList<Game> _games;

        private readonly IScoreService _scoreService;

        public RankingService(IScoreService scoreService)
        {
            _games = new List<Game>();
            _scoreService = scoreService;
        }

        public void Play(Competitor competitor)
        {
            double score = _scoreService.CalculateScoreConcurrent(competitor.ApiAccessToken, competitor.Endpoint).Result;

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

        public IEnumerable<string> Validate(Competitor competitor)
        {
            return _scoreService.ValidateEndpoint(competitor.ApiAccessToken, competitor.Endpoint).Result;
        }
    }
}
