using System.Threading.Tasks;

namespace MLCompetition.Domain
{
    public interface IScoreService
    {
        double CalculateScore(Competitor competitor);

        Task<double> CalculateScoreAsync(Competitor competitor);
    }
}
