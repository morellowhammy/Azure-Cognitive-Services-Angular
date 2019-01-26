using System.Collections.Generic;
using MLCompetition.Domain;
using MLCompetition.Dtos;

namespace MLCompetition.Interfaces
{
    public interface IRankingService
    {
        void Play(Competitor competitor);
        IEnumerable<Game> GetRanking();

        IEnumerable<string> Validate(Competitor competitor);
    }
}
