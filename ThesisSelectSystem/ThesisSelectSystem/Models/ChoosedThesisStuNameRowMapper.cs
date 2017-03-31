using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ThesisSelectSystem.Models
{
    public class ChoosedThesisStuNameRowMapper : IRowMapper<ChoosedThesisStuNameList>
    {
        public List<ChoosedThesisStuNameList> RowMap(DataTable dataTable)
        {
            List<ChoosedThesisStuNameList>list=new List<ChoosedThesisStuNameList>();
            int len = dataTable.Columns.Count;
            Object[] values=new object[len];
            foreach (DataRow row in dataTable.Rows)
            {
                int index = 0;
                foreach (DataColumn column in dataTable.Columns)
                {
                    values[index++] = row[column];
                }
                ChoosedThesisStuNameList a=new ChoosedThesisStuNameList();
                a.sno = Convert.ToString(values[0]);
                a.name = Convert.ToString(values[1]);
                a.thesis_id = Convert.ToInt64(values[2]);
                a.thesis_name = Convert.ToString(values[3]);
                a.guider_id = Convert.ToString(values[4]);
                list.Add(a);
            }
            return list;
        }
    }
}