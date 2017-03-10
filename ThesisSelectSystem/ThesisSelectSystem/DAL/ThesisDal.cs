using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Model;

namespace ThesisSelectSystem.DAL
{
    public class ThesisDal
    {
        /// <summary>
        /// 查询指定条件教师拟的题目
        /// </summary>
        /// <param name="teacherId">教师ID</param>
        /// <param name="usedYear">毕业论题使用年份</param>
        /// <param name="thesisStatus">毕业论题状态,一般有"待审核"、"审核通过"、"未通过"、"已被选"4种状态</param>
        /// <returns></returns>
        public List<Thesis> QueryTeacherThesis(string teacherId, int usedYear, string thesisStatus)
        {
            List<Thesis>teacherThesesList=new List<Thesis>();
            Object[] values=new object[3];
            int index = 0;
            string sql = @"select TopicId,TopicTitle,TopicType 
                        from thesis 
                        where UsingYear=@year and TopicMakerId = @topicMakerId and TopicStatus= @status";
            SqlParameter[] parameters=new SqlParameter[3];
            parameters[0]=new SqlParameter("@year", SqlDbType.Int);
            parameters[0].Value = usedYear;
            parameters[1]=new SqlParameter("@topicMakerId", SqlDbType.NVarChar);
            parameters[1].Value = teacherId;
            parameters[2]=new SqlParameter("@status", SqlDbType.NVarChar);
            parameters[2].Value = thesisStatus;
            var thesisDataTable = SqlHelper.ExecuteDataTable(sql, parameters);
            foreach (DataRow row in thesisDataTable.Rows)
            {
                Thesis thesis=new Thesis();
                index = 0;
                foreach (DataColumn column in thesisDataTable.Columns)
                {
                    values[index++] = row[column];
                }
                try
                {
                    thesis.topicId = Convert.ToInt32(values[0]);
                    thesis.topicTitle = Convert.ToString(values[1]);
                    thesis.topicType = Convert.ToString(values[2]);
                    teacherThesesList.Add(thesis);
                }
                catch (Exception)
                {
                    
                    throw;
                }
                
            } 
            return teacherThesesList;
        }


        public List<PartOfThesis> QueryAllNotPassExamineTesis(int year)
        {
            List<PartOfThesis> thesisList=new List<PartOfThesis>();
            SqlParameter yearParameter=new SqlParameter("@year",SqlDbType.Int);
            yearParameter.Value = year;
            DataTable dataTable = SqlHelper.ExecuteDataTableProc("QueryUnPassThesis",new SqlParameter[] {yearParameter});
            Object[] values=new object[6];
            foreach (DataRow row in dataTable.Rows)
            {
                int index = 0;
                PartOfThesis thesis = new PartOfThesis();
                foreach (DataColumn column in dataTable.Columns)
                {
                    values[index++] = row[column];
                }
                try
                {
                    thesis.topicId = Convert.ToInt32(values[0]);
                    thesis.makerName = Convert.ToString(values[1]);
                    thesis.topicTitle = Convert.ToString(values[2]);
                    thesis.topicSources = Convert.ToString(values[3]);
                    thesis.topicType = Convert.ToString(values[4]);
                    thesis.maxOptionalNumber = Convert.ToInt32(values[5]);
                    thesisList.Add(thesis);
                }
                catch (Exception)
                {
                    
                    throw;
                }
                
            }
            return thesisList;
        } 

    }
}