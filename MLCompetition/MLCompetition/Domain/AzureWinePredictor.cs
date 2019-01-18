using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
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
            return await InvokeRequestResponseService().ConfigureAwait(false);
        }

        private async Task<double> InvokeRequestResponseService()
        {
            using (var client = new HttpClient())
            {
                var scoreRequest = GetScoreRequest();

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiAccessToken);
                client.BaseAddress = new Uri(_endpoint);

                HttpResponseMessage response = await client.PostAsJsonAsync("", scoreRequest).ConfigureAwait(false);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();
                    //result = "{\"Results\":{\"output1\":[{\"Scored Labels\":\"1.66655457905257\"}]}}"
                    Console.WriteLine("Result: {0}", result);
                }
                else
                {
                    Console.WriteLine($"The request failed with status code: {response.StatusCode}");

                    // Print the headers - they include the requert ID and the timestamp,
                    // which are useful for debugging the failure
                    Console.WriteLine(response.Headers.ToString());

                    string responseContent = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(responseContent);
                }

                return 10.0;
            }
        }

        

        private object GetScoreRequest()
        {
            var wineList = _scoreDataService.GetData();


            var scoreRequest = new
            {
                Inputs = new Dictionary<string, List<Dictionary<string, double>>>()
                {
                    {
                        "input1",
                        new List<Dictionary<string, double>>()
                        {
                            ConvertWineToDictionary(wineList.FirstOrDefault())
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
