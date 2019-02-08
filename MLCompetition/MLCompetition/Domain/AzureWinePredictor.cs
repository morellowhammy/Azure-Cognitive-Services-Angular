using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using MLCompetition.Dtos;
using MLCompetition.Interfaces;

namespace MLCompetition.Domain
{
    public class AzureWinePredictor : IScoreService
    {
        private string _apiAccessToken;

        private string _endpoint;

        private readonly IScoreDataService<Wine> _scoreDataService;

        private const int NUMBER_WINES_TO_EVALUATE = 10;

        public AzureWinePredictor(IScoreDataService<Wine> scoreDataService)
        {
            _scoreDataService = scoreDataService;
            _scoreDataService.Init();
        }

        public async Task<IEnumerable<string>> ValidateEndpoint(string apiAccessToken, string endpoint)
        {
            _apiAccessToken = apiAccessToken;
            _endpoint = endpoint;
            string pattern = @"-?\d+(?:\.\d+)";
            var errorsList = new List<string>();

            var wine = _scoreDataService.GetData().First();
            
            var result = await InvokeRequestResponseService(wine).ConfigureAwait(false);

            if (Regex.Matches(result, pattern).Count > 1)
            {
                errorsList.Add("Service response has more than one score value");
            }
            else if(result.Contains("error"))
            {
                var regex = new Regex(@".*(data:(?<error>.*)\.)");
                var error = regex.Match(result).Groups["error"].Value;
                errorsList.Add(error);
            }
            return errorsList;
        }

        public async Task<double> CalculateScoreAsync(string apiAccessToken, string endpoint)
        {
            _apiAccessToken = apiAccessToken;
            _endpoint = endpoint;
            List<WineEvaluation> wineEvaluationList = new List<WineEvaluation>();

            var wineListToEvaluate = _scoreDataService.GetData().Take(NUMBER_WINES_TO_EVALUATE);

            foreach (var wine in wineListToEvaluate)
            {
                var score = await GetWineScore(wine).ConfigureAwait(false);
                wineEvaluationList.Add(new WineEvaluation()
                {
                    Wine = wine,
                    Score = score
                });
            }

            double finalScore = CalculateScore3(wineEvaluationList);

            return finalScore;
        }

        public async Task<double> CalculateScoreConcurrent(string apiAccessToken, string endpoint)
        {
            _apiAccessToken = apiAccessToken;
            _endpoint = endpoint;
            var wineEvaluationList = new ConcurrentBag<WineEvaluation>();

            var wineListToEvaluate = _scoreDataService.GetData().Take(NUMBER_WINES_TO_EVALUATE);

            await Task.WhenAll(wineListToEvaluate.Select(wine => Task.Run(async () =>
            {
                try
                {
                    var score = await GetWineScore(wine).ConfigureAwait(false);
                    wineEvaluationList.Add(new WineEvaluation()
                    {
                        Wine = wine,
                        Score = score
                    });
                }
                catch (Exception)
                {
                    Console.WriteLine("Error while calling concurrently to Azure");
                }
            })).ToArray()).ConfigureAwait(false);

            double finalScore = CalculateScore3(wineEvaluationList);

            return finalScore;
        }

        private double CalculateScore1(IEnumerable<WineEvaluation> wineEvaluations)
        {
            double sum = 0;

            var wineEvs = wineEvaluations.ToList();
            foreach (var wineEv in wineEvs)
            {
                sum += wineEv.Score / wineEv.Wine.Quality;
            }

            return wineEvs.Any() ? (sum / wineEvs.Count) : 10;
        }

        private double CalculateScore2(IEnumerable<WineEvaluation> wineEvaluations)
        {
            double sum = 0;

            var wineEvs = wineEvaluations.ToList();
            foreach (var wineEv in wineEvs)
            {
                sum += Math.Abs(wineEv.Score / wineEv.Wine.Quality - 1) + 1;
            }

            return wineEvs.Any() ? (sum / wineEvs.Count) : 10;
        }

        private double CalculateScore3(IEnumerable<WineEvaluation> wineEvaluations)
        {
            double sum = 0;

            var wineEvs = wineEvaluations.ToList();
            foreach (var wineEv in wineEvs)
            {
                sum += Math.Abs(wineEv.Score - wineEv.Wine.Quality) + 1;
            }

            return wineEvs.Any() ? (sum / wineEvs.Count) : 10;
        }

        private async Task<double> GetWineScore(Wine wine)
        {
            double score = 10.0;
            string pattern = @"-?\d+(?:\.\d+)";

            string result = await InvokeRequestResponseService(wine).ConfigureAwait(false);
            
            foreach (Match m in Regex.Matches(result, pattern))
            {
                score = double.Parse(m.Value, System.Globalization.CultureInfo.InvariantCulture);
                Console.WriteLine("'{0}' found at index {1}.", m.Value, m.Index);
            }

            return score;
        }

        private async Task<string> InvokeRequestResponseService(Wine wine)
        {
            using (var client = new HttpClient())
            {
                var scoreRequest = GetScoreRequest(wine);

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiAccessToken);
                client.BaseAddress = new Uri(_endpoint);

                HttpResponseMessage response = await client.PostAsJsonAsync("", scoreRequest).ConfigureAwait(false);

                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                }
                else
                {
                    Console.WriteLine($"The request failed with status code: {response.StatusCode}");
                    Console.WriteLine(response.Headers.ToString());

                    string responseContent = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    Console.WriteLine(responseContent);

                    return responseContent;
                }
            }
        }

        private object GetScoreRequest(Wine wine)
        {
            var scoreRequest = new
            {
                Inputs = new Dictionary<string, List<Dictionary<string, double>>>()
                {
                    {
                        "input1",
                        new List<Dictionary<string, double>>()
                        {
                            ConvertWineToDictionary(wine)
                        }
                    },
                },
                GlobalParameters = new Dictionary<string, string>()
                {
                }
            };
            return scoreRequest;
        }

        private Dictionary<string, double> ConvertWineToDictionary(Wine wine)
        {
            var dictionary = new Dictionary<string, double>()
            {
                {
                    "fixed acidity", wine.FixedAcidity
                },
                {
                    "volatile acidity", wine.VolatileAcidity
                },
                {
                    "citric acid", wine.CitricAcid
                },
                {
                    "residual sugar", wine.ResidualSugar
                },
                {
                    "chlorides", wine.Chlorides
                },
                {
                    "free sulfur dioxide", wine.FreeSulfurDioxide
                },
                {
                    "total sulfur dioxide", wine.TotalSulfurDioxide
                },
                {
                    "density", wine.Density
                },
                {
                    "pH", wine.Ph
                },
                {
                    "sulphates", wine.Sulphates
                },
                {
                    "alcohol", wine.Alcohol
                }
            };

            return dictionary;
        }
    }
}
