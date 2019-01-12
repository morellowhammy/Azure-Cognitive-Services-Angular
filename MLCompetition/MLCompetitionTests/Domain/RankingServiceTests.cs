using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MLCompetition.Domain;
using Moq;

namespace MLCompetitionTests.Domain
{
    [TestClass]
    public class RankingServiceTests
    {
        private IRankingService _rankingService;

        private readonly Mock<IScoreService> _mockScoreService = new Mock<IScoreService>();

        [TestMethod]
        public void Test_Play_should()
        {
        }

        [TestMethod]
        public void Test_GetRankings_ShouldReturnEmptyListIfNobodyHasPlayed()
        {
            _rankingService = new RankingService(_mockScoreService.Object);

            var result = _rankingService.GetRanking();

            Assert.IsNotNull(result, "Ranking list should not be null");
            Assert.IsFalse(result.Any(), "Ranking list should be empty");
        }
    }
}
