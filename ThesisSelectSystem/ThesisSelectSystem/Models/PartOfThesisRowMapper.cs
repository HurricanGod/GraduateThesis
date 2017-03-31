using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ThesisSelectSystem.Models
{
    public class PartOfThesisRowMapper:IRowMapper<PartOfThesisInfo>
    {
        List<PartOfThesisInfo> IRowMapper<PartOfThesisInfo>.RowMap(DataTable dataTable)
        {
            List<PartOfThesisInfo> thesisInfos=new List<PartOfThesisInfo>();
            int len = dataTable.Columns.Count;
            Object[] values=new object[len];
            foreach (DataRow row in dataTable.Rows)
            {
                int index = 0;
                foreach (DataColumn column in dataTable.Columns)
                {
                    values[index++] = row[column];
                }
                PartOfThesisInfo thesisInfo=new PartOfThesisInfo();
                thesisInfo.thesis_id = Convert.ToInt64(values[0]);
                thesisInfo.thesis_name = Convert.ToString(values[1]);
                thesisInfo.thesis_type = Convert.ToString(values[2]);
                thesisInfo.thesis_status = Convert.ToString(values[3]);
                thesisInfos.Add(thesisInfo);
            }
            return thesisInfos;
        }
    }
}