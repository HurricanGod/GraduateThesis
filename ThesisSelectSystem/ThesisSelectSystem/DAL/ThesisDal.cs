using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using ThesisSelectSystem.Models;

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
                thesis.topicId = Convert.ToInt32(values[0]);
                thesis.makerName = Convert.ToString(values[1]);
                thesis.topicTitle = Convert.ToString(values[2]);
                thesis.topicSources = Convert.ToString(values[3]);
                thesis.topicType = Convert.ToString(values[4]);
                thesis.maxOptionalNumber = Convert.ToInt32(values[5]);
                thesisList.Add(thesis);

            }
            return thesisList;
        }


        /// <summary>
        /// 查询选了指导老师非自拟题学生的学号、姓名、课题号、课题名
        /// </summary>
        /// <param name="proc"></param>
        /// <param name="args"></param>
        /// <returns></returns>
        public List<ChooseTeacherThesis> QueryChooseTeacherThesisInfo(string proc, SqlParameter[] args)
        {
            CommomQuery < ChooseTeacherThesis > query= new CommomQuery<ChooseTeacherThesis>();
            return query.ProcedureQueryToList(proc, args, new ChooseTeacherThesisRowMapper());
        }


        /// <summary>
        /// 查询教师已经同意指导的学生的姓名、班级、论题名、论题来源
        /// </summary>
        /// <param name="proc">存储过程名</param>
        /// <param name="args">存储过程需要的参数</param>
        /// <returns></returns>
        public List<TGuidingStudentInfo> QueryChoosedGuidingStudent(string proc, SqlParameter[] args)
        {
            CommomQuery<TGuidingStudentInfo> query=new CommomQuery<TGuidingStudentInfo>();
            return query.ProcedureQueryToList(proc, args,new GuideStudentTableRowMapper());
        }


        /// <summary>
        /// 执行教师选定非自拟题学生的事务
        /// </summary>
        /// <param name="proc">存储过程名字</param>
        /// <param name="args">存储过程所需要的参数</param>
        /// <returns></returns>
        public bool ExecuteChooseStudentTran(string proc, SqlParameter[] args)
        {
            return SqlHelper.ExecuteNonqueryProc(proc, args) > 0 ? true : false;
        }


        /// <summary>
        /// 查询指定年份所有通过审核的论题
        /// </summary>
        /// <param name="procName">存储过程名</param>
        /// <param name="year">需要指定的年份</param>
        /// <returns></returns>
        public List<PassExamineThesis> QueryAllPassExamineThesis(string procName, int year)
        {
            SqlParameter yearParameter=new SqlParameter("@year", year);
            CommomQuery<PassExamineThesis>query=new CommomQuery<PassExamineThesis>();
            return query.ProcedureQueryToList(procName, new SqlParameter[] {yearParameter},
                new PassExamineThesisRowMapper());
        }



        /// <summary>
        /// 查询指定年份教师拟定的论题
        /// </summary>
        /// <param name="teacherid"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public List<PartOfThesisInfo> QueryAllThesisOfTeacher(string teacherid,int year)
        {
            SqlParameter yearParameter=new SqlParameter("@year",year);
            SqlParameter tidParameter=new SqlParameter("@tid",teacherid);
            CommomQuery<PartOfThesisInfo>query=new CommomQuery<PartOfThesisInfo>();
            return query.ProcedureQueryToList("QueryAllOfThesisDrawByTeacher",
                new SqlParameter[] {yearParameter, tidParameter}, new PartOfThesisRowMapper());

        }

        /// <summary>
        /// 根据论题号查询审题老师建议
        /// </summary>
        /// <param name="id">论题号id</param>
        /// <returns></returns>
        public List<string> QueryInspectThesisSuggestionById(long id)
        {
            string sql = @"select Suggestion from audit where TopicId=@topicid";
            SqlParameter idParameter=new SqlParameter("@topicid",id);
            DataTable dataTable = SqlHelper.ExecuteDataTable(sql, new SqlParameter[] {idParameter});
            return (from DataRow row in dataTable.Rows from DataColumn column in dataTable.Columns select (row[column]).ToString()).ToList();
        }



        public List<StudentMakeThesis> QueryStudentMakeThesisInfo(string teacherid, int year)
        {
            SqlParameter statusParameter=new SqlParameter("@whether_make_topic","是");
            SqlParameter teacheridParameter=new SqlParameter("@teacher_id", teacherid);
            SqlParameter using_year=new SqlParameter("@using_year",year);
            CommomQuery<StudentMakeThesis>query=new CommomQuery<StudentMakeThesis>();
            return query.ProcedureQueryToList("QueryStudentMakeThesisInfo", new SqlParameter[]
            {statusParameter, teacheridParameter, using_year}, new StudentMakeThesisRowMapper());
        }


        public List<ChoosedThesisStuNameList> QueryTeacherChooseAllOfStudent(string procedureName, SqlParameter[] args)
        {
            CommomQuery<ChoosedThesisStuNameList> query=new CommomQuery<ChoosedThesisStuNameList>();
            return query.ProcedureQueryToList(procedureName, args, new ChoosedThesisStuNameRowMapper());
        }
    }
}