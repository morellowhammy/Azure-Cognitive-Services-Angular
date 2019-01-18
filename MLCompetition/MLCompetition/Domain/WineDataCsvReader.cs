using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Policy;
using CsvHelper;
using MLCompetition.Dtos;
using MLCompetition.Interfaces;

namespace MLCompetition.Domain
{
    public class WineDataCsvReader : IScoreDataService<Wine>
    {
        private IList<Wine> _wineList;

        //private string dataPath = 

        public WineDataCsvReader()
        {
            _wineList = new List<Wine>();
        }

        public void Init()
        {
            Read();
        }

        public IEnumerable<Wine> GetData()
        {
            return _wineList;
        }

        private void Read()
        {
            var buildDir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var filePath = buildDir + @"\Data\winequality-red.csv";

            if (File.Exists(filePath))
            {
                using (var reader = new StreamReader(filePath))
                using (var csv = new CsvReader(reader))
                {
                    var records = csv.GetRecords<Wine>();
                    _wineList = records.ToList();
                }
            }
        }
    }
}
