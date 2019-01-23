using System.Threading.Tasks;

namespace MLCompetition.Interfaces
{
    public interface IScoreService
    {
        Task<double> CalculateScoreAsync(string apiAccessToken, string endpoint);
    }
}
