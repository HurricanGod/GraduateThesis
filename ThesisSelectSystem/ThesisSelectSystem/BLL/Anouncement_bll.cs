using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Model;
using ThesisSelectSystem.DAL;

namespace ThesisSelectSystem.BLL
{
    public class Anouncement_bll
    {
        /// <summary>
        /// 查询过去n天的公告,n>=0
        /// </summary>
        /// <param name="count"></param>
        /// <returns></returns>
        public List<Announcement> QueryAnnouncementsByDay(int n)
        {
            List<Announcement>announcements=new List<Announcement>();
            SqlParameter dayCountParameter=new SqlParameter("@interval", SqlDbType.Int);
            dayCountParameter.Value = n;
            DataTable dataTable = SqlHelper.ExecuteDataTableProc("QueryLastMonthAnnouncement",
                new SqlParameter[] {dayCountParameter});
            Object[] cellValue=new object[5];
            foreach (DataRow row in dataTable.Rows)
            {
                int index = 0;
                foreach (DataColumn column in dataTable.Columns)
                {
                    cellValue[index++] = row[column];
                }
                Announcement announcement=new Announcement();
                announcement.aid = Convert.ToInt32(cellValue[0]);
                announcement.title = Convert.ToString(cellValue[1]);
                announcement.contents = Convert.ToString(cellValue[2]);
                announcement.scope = Convert.ToString(cellValue[3]);
                announcement.times = Convert.ToDateTime(cellValue[4]);
                announcements.Add(announcement);
            }
            return announcements;
        }
    }
}