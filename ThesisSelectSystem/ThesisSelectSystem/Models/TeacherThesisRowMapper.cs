using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ThesisSelectSystem.Models
{
    public class TeacherThesisRowMapper:IRowMapper<TeacherThesis>
    {
        public List<TeacherThesis> RowMap(DataTable dataTable)
        {
            List<TeacherThesis> list =new List<TeacherThesis>();
            int len = dataTable.Columns.Count;
            Object[] values=new object[len];
            foreach (DataRow row in dataTable.Rows)
            {
                int index = 0;
                foreach (DataColumn column in dataTable.Columns)
                {
                    values[index++] = row[column];
                }
                TeacherThesis thesis=new TeacherThesis();
                thesis.id = Convert.ToInt64(values[0]);
                thesis.title = Convert.ToString(values[1]);
                thesis.type = Convert.ToString(values[2]);
                thesis.maker = Convert.ToString(values[3]);
                thesis.currentChoosedNumber = Convert.ToInt32(values[4]);
                thesis.maxChoosedNumber = Convert.ToInt32(values[5]);
                list.Add(thesis);
            }
            return list;
        }
    }
}