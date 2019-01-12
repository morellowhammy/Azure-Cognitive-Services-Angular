using System.Threading.Tasks;

namespace MLCompetition.Domain
{
    public interface IScoreService
    {
        Task<double> CalculateScoreAsync(string apiAccessToken, string endpoint);
    }
}
