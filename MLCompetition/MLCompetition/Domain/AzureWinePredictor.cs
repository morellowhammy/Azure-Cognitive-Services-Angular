using System;
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

        public AzureWinePredictor(IScoreDataService<Wine> scoreDataService)
        {
            _scoreDataService = scoreDataService;
            _scoreDataService.Init();
        }

        public async Task<double> CalculateScoreAsync(string apiAccessToken, string endpoint)
        {
            _apiAccessToken = apiAccessToken;
            _endpoint = endpoint;
            List<WineEvaluation> wineEvaluationList = new List<WineEvaluation>();

            var wineListToEvaluate = _scoreDataService.GetData().Take(100);

            foreach (var wine in wineListToEvaluate)
            {
                var score = await InvokeRequestResponseService(wine).ConfigureAwait(false);
                wineEvaluationList.Add(new WineEvaluation()
                {
                    Wine = wine,
                    Score = score
                });
            }

            double finalScore = CalculateScore3(wineEvaluationList);

            return finalScore;
        }

        private double CalculateScore1(IList<WineEvaluation> wineEvaluations)
        {
            double sum = 0;

            foreach (var wineEv in wineEvaluations)
            {
                sum += wineEv.Score / wineEv.Wine.Quality;
            }

            return wineEvaluations.Any() ? (sum / wineEvaluations.Count) : 10;
        }

        private double CalculateScore2(IList<WineEvaluation> wineEvaluations)
        {
            double sum = 0;

            foreach (var wineEv in wineEvaluations)
            {
                sum += Math.Abs(wineEv.Score / wineEv.Wine.Quality - 1) + 1;
            }

            return wineEvaluations.Any() ? (sum / wineEvaluations.Count) : 10;
        }

        private double CalculateScore3(IList<WineEvaluation> wineEvaluations)
        {
            double sum = 0;

            foreach (var wineEv in wineEvaluations)
            {
                sum += Math.Abs(wineEv.Score - wineEv.Wine.Quality) + 1;
            }

            return wineEvaluations.Any() ? (sum / wineEvaluations.Count) : 10;
        }

        private async Task<double> InvokeRequestResponseService(Wine wine)
        {
            using (var client = new HttpClient())
            {
                double score = 10.0;
                var scoreRequest = GetScoreRequest(wine);

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiAccessToken);
                client.BaseAddress = new Uri(_endpoint);

                HttpResponseMessage response = await client.PostAsJsonAsync("", scoreRequest).ConfigureAwait(false);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();

                    //result = "{\"Results\":{\"output1\":[{\"Scored Labels\":\"1.66655457905257\"}]}}"
                    string pattern = @"-?\d+(?:\.\d+)";

                    foreach (Match m in Regex.Matches(result, pattern))
                    {
                        score = double.Parse(m.Value, System.Globalization.CultureInfo.InvariantCulture);
                        Console.WriteLine("'{0}' found at index {1}.", m.Value, m.Index);
                    }
                }
                else
                {
                    Console.WriteLine($"The request failed with status code: {response.StatusCode}");
                    Console.WriteLine(response.Headers.ToString());

                    string responseContent = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(responseContent);
                }

                return score;
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
