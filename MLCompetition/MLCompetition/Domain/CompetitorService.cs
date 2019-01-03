using System.Collections.Generic;
using System.Linq;

namespace MLCompetition.Domain
{
    public class CompetitorService : ICompetitorService
    {
        private readonly IList<Competitor> _competitors;

        public CompetitorService()
        {
            _competitors = new List<Competitor>();
        }

        public IEnumerable<Competitor> GetCompetitors()
        {
            return _competitors;
        }

        public Competitor AddCompetitor(Competitor competitor)
        {
            _competitors.Add(competitor);
            return competitor;
        }

        public void DeleteCompetitor(string name)
        {
            var itemToRemove = _competitors.Single(x => x.Name == name);
            if (itemToRemove != null)
            {
                _competitors.Remove(itemToRemove);
            }
        }
    }
}
