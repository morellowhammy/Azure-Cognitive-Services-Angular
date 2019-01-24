using System.Collections.Generic;
using System.Threading.Tasks;

namespace MLCompetition.Interfaces
{
    public interface IScoreService
    {
        Task<double> CalculateScoreAsync(string apiAccessToken, string endpoint);
        Task<double> CalculateScoreConcurrent(string apiAccessToken, string endpoint);
        Task<IEnumerable<string>> ValidateEndpoint(string apiAccessToken, string endpoint);
    }
}
