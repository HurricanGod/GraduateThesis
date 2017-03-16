using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ThesisSelectSystem.Models
{
    public class ChooseTeacherThesisRowMapper:IRowMapper<ChooseTeacherThesis>
    {
        public List<ChooseTeacherThesis> RowMap(DataTable dataTable)
        {
            List<ChooseTeacherThesis> cttRecords=new List<ChooseTeacherThesis>();
            int length = dataTable.Columns.Count;
            Object[] values=new object[length];
            foreach (DataRow row in dataTable.Rows)
            {
                int index = 0;
                foreach (DataColumn column in dataTable.Columns)
                {
                    values[index++] = row[column];
                }
                ChooseTeacherThesis ctt=new ChooseTeacherThesis();
                ctt.sno = Convert.ToString(values[0]);
                ctt.sname = Convert.ToString(values[1]);
                ctt.thesisId = Convert.ToInt64(values[2]);
                ctt.title = Convert.ToString(values[3]);
                cttRecords.Add(ctt);
            }
            return cttRecords;
        } 
    }
}