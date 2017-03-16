using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ThesisSelectSystem.Models;

namespace ThesisSelectSystem.DAL
{
    public class CommomQuery<T> where T:class 
    {
        public List<T> SqlTextQueryToList(string sql,SqlParameter[] args,IRowMapper<T>rowMapper )
        {
            DataTable dataTable = SqlHelper.ExecuteDataTable(sql, args);
            return rowMapper.RowMap(dataTable);
        }

        public List<T> ProcedureQueryToList(string procName, SqlParameter[] args, IRowMapper<T> rowMapper)
        {
            DataTable dataTable = SqlHelper.ExecuteDataTableProc(procName, args);
            return rowMapper.RowMap(dataTable);
        }
    }
}