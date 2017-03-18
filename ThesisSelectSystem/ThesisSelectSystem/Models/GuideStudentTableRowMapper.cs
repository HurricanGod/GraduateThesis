using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ThesisSelectSystem.Models
{
    public class GuideStudentTableRowMapper:IRowMapper<TGuidingStudentInfo>
    {
       
        public List<TGuidingStudentInfo> RowMap(DataTable dataTable)
        {
            List<TGuidingStudentInfo> list=new List<TGuidingStudentInfo>();
            int length = dataTable.Columns.Count;
            Object[] values = new object[length];
            foreach (DataRow row in dataTable.Rows)
            {
                int index = 0;
                foreach (DataColumn column in dataTable.Columns)
                {
                    values[index++] = row[column];
                }
                TGuidingStudentInfo t=new TGuidingStudentInfo();
                t.sname = Convert.ToString(values[0]);
                t.className = Convert.ToString(values[1]);
                t.thesisName = Convert.ToString(values[2]);
                t.thesiSourcs = Convert.ToString(values[3]);
                list.Add(t);

            }
            return list;
        }
    }
}