using System.Collections.Generic;

namespace MLCompetition.Domain
{
    public interface ICompetitorService
    {
        IEnumerable<Competitor> GetCompetitors();
        Competitor AddCompetitor(Competitor competitor);
        void DeleteCompetitor(string name);
    }
}
