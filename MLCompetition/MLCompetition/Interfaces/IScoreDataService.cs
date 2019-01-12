using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MLCompetition.Interfaces
{
    public interface IScoreDataService<T>
    {
        IEnumerable<T> GetData();
    }
}
