using System.Collections.Generic;
using System.Linq;
using MLCompetition.Dtos;

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
            var comp = _competitors.FirstOrDefault(x => x.Name == competitor.Name);
            if (comp == null)
            {
                _competitors.Add(competitor);
            }
            else
            {
                comp.ApiAccessToken = competitor.ApiAccessToken;
                comp.Email = competitor.Email;
                comp.Endpoint = competitor.Endpoint;
            }

            return competitor;
        }

        public bool DeleteCompetitor(string name)
        {
            var itemToRemove = _competitors.Single(x => x.Name == name);
            return itemToRemove != null && _competitors.Remove(itemToRemove);
        }
    }
}
