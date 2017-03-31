using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ThesisSelectSystem.Models
{
    public class StudentMakeThesisRowMapper : IRowMapper<StudentMakeThesis>
    {
        public List<StudentMakeThesis> RowMap(DataTable dataTable)
        {
            List<StudentMakeThesis> list=new List<StudentMakeThesis>();
            int len = dataTable.Columns.Count;
            Object[] values=new object[len];
            foreach (DataRow row in dataTable.Rows)
            {
                int index = 0;
                foreach (DataColumn column in dataTable.Columns)
                {
                    values[index++] = row[column];
                }
                StudentMakeThesis s=new StudentMakeThesis();
                s.sno = Convert.ToString(values[0]);
                s.name = Convert.ToString(values[1]);
                s.thesis_id = Convert.ToInt64(values[2]);
                s.thesis_name = Convert.ToString(values[3]);
                s.thesis_status = Convert.ToString(values[4]);
                list.Add(s);
            }
            return list;
        }
    }
}