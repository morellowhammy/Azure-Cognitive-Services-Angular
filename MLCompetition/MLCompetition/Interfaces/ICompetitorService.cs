using System.Collections.Generic;
using MLCompetition.Dtos;

namespace MLCompetition.Domain
{
    public interface ICompetitorService
    {
        IEnumerable<Competitor> GetCompetitors();
        Competitor AddCompetitor(Competitor competitor);
        bool DeleteCompetitor(string name);
    }
}
