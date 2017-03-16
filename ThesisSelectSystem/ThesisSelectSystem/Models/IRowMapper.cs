using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ThesisSelectSystem.Models
{
    public interface IRowMapper<T>
    {
         List<T> RowMap(DataTable dataTable);

    }
}
