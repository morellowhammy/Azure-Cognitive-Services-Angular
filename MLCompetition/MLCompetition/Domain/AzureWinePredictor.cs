using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace MLCompetition.Domain
{
    public class AzureWinePredictor : IScoreService
    {
        private string _apiAccessToken;

        private string _endpoint;

        public double CalculateScore(Competitor competitor)
        {
            throw new NotImplementedException();
        }

        public async Task<double> CalculateScoreAsync(Competitor competitor)
        {
            _apiAccessToken = competitor.ApiAccessToken;
            _endpoint = competitor.Endpoint;
            return await InvokeRequestResponseService().ConfigureAwait(false);
        }

        private async Task<double> InvokeRequestResponseService()
        {
            using (var client = new HttpClient())
            {
                var scoreRequest = new
                {
                    Inputs = new Dictionary<string, List<Dictionary<string, string>>>() {
                        {
                            "input1",
                            new List<Dictionary<string, string>>(){new Dictionary<string, string>(){
                                            {
                                                "fixed acidity", "1"
                                            },
                                            {
                                                "volatile acidity", "1"
                                            },
                                            {
                                                "citric acid", "1"
                                            },
                                            {
                                                "residual sugar", "1"
                                            },
                                            {
                                                "chlorides", "1"
                                            },
                                            {
                                                "free sulfur dioxide", "1"
                                            },
                                            {
                                                "total sulfur dioxide", "1"
                                            },
                                            {
                                                "density", "1"
                                            },
                                            {
                                                "pH", "1"
                                            },
                                            {
                                                "sulphates", "1"
                                            },
                                            {
                                                "alcohol", "1"
                                            },
                                            {
                                                "quality", "1"
                                            },
                                }
                            }
                        },
                    },
                    GlobalParameters = new Dictionary<string, string>()
                    {
                    }
                };

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
    }
}
