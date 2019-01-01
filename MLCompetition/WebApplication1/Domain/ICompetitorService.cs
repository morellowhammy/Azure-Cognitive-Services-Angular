using System.Collections.Generic;

namespace WebApplication1.Domain
{
    public interface ICompetitorService
    {
        IEnumerable<Competitor> GetCompetitors();
        Competitor AddCompetitor(Competitor competitor);
        void DeleteCompetitor(string name);
    }
}
