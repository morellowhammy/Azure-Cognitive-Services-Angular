using System.Collections.Generic;
using MLCompetition.Domain;

namespace MLCompetition.Interfaces
{
    public interface IRankingService
    {
        void Play(Competitor competitor);
        IEnumerable<Game> GetRanking();

        IEnumerable<string> Validate(Competitor competitor);
    }
}
