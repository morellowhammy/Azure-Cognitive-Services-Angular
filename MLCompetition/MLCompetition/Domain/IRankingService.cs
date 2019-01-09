using System.Collections.Generic;

namespace MLCompetition.Domain
{
    public interface IRankingService
    {
        void Play(Competitor competitor);
        IEnumerable<Game> GetRanking();
    }
}
