using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ThesisSelectSystem.Models
{
    public class PassExamineThesisRowMapper : IRowMapper<PassExamineThesis>
    {
        public List<PassExamineThesis> RowMap(DataTable dataTable)
        {
            List<PassExamineThesis> passExamineThesesList=new List<PassExamineThesis>();
            Object[] values=new object[dataTable.Columns.Count];
            foreach (DataRow row in dataTable.Rows)
            {
                int index = 0;
                foreach (DataColumn column in dataTable.Columns)
                {
                    values[index++] = row[column];
                }
                PassExamineThesis thesisinfo=new PassExamineThesis();
                thesisinfo.thesis_no = Convert.ToInt64(values[0]);
                thesisinfo.maker_name = Convert.ToString(values[1]);
                thesisinfo.sources = Convert.ToString(values[2]);
                thesisinfo.thesis_status = Convert.ToString(values[3]);
                thesisinfo.thesis_name = Convert.ToString(values[4]);
                thesisinfo.usingyear = Convert.ToInt32(values[5]);
                passExamineThesesList.Add(thesisinfo);
            }
            return passExamineThesesList;
        }
    }
}