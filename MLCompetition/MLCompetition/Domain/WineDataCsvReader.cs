using System;
using System.Collections.Generic;
using System.IO;
using MLCompetition.Dtos;
using MLCompetition.Interfaces;

namespace MLCompetition.Domain
{
    public class WineDataCsvReader : IScoreDataService<Wine>
    {
        private readonly IList<Wine> _wineList;

        //private string dataPath = 

        public WineDataCsvReader()
        {
            _wineList = new List<Wine>();
        }

        public IEnumerable<Wine> GetData()
        {
            return _wineList;
        }
    }
}
