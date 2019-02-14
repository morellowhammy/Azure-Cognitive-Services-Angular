using MLCompetition.Interfaces;

namespace MLCompetition.Domain
{
    public class AdminService : IAdminService
    {
        public bool CompetitionEnabled { get; set; }
    }
}
