using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Model;
using ThesisSelectSystem.DAL;
using ThesisSelectSystem.Models;

namespace ThesisSelectSystem.BLL
{
    public class StudentBll
    {
        /// <summary>
        /// 获取当前帐号的用户名
        /// </summary>
        /// <param name="sno"></param>
        /// <returns></returns>
        public string GetName(string sno)
        {
            SqlParameter idParameter=new SqlParameter("@userid", sno);
            var username = SqlHelper.ExecuteScalarProc("QueryUserName", new SqlParameter[] {idParameter});
            return Convert.ToString(username);
        }
            

        public List<TeacherThesis> QueryTeacherThesisBll(int year)
        {
            SqlParameter yearParameter=new SqlParameter("@usingyear",year);
            SqlParameter thesisStatus=new SqlParameter("@topic_status", "审核通过");
            SqlParameter thesisSources=new SqlParameter("@topic_sources", "教师拟题");
            CommomQuery<TeacherThesis>query=new CommomQuery<TeacherThesis>();
            return query.ProcedureQueryToList("QueryThesisInStudentPage",
                new SqlParameter[] {yearParameter, thesisStatus, thesisSources}, new TeacherThesisRowMapper());
        }

        /// <summary>
        /// 查询学生选题页面可供选择的教师
        /// </summary>
        /// <returns></returns>
        public List<Teacher> QueryGuiders()
        {
            string sql = @"select TeacherId,TeacherName from Teacher";
            List<Teacher> teachers=new List<Teacher>();
            var teacherDataTable = SqlHelper.ExecuteDataTable(sql);
            Object[] propertyValue=new object[2];
            foreach (DataRow row in teacherDataTable.Rows)
            {
                int index = 0;
                foreach (DataColumn column in teacherDataTable.Columns)
                {
                    propertyValue[index++] = row[column];
                }
                Teacher teacher=new Teacher();
                teacher.id = Convert.ToString(propertyValue[0]);
                teacher.name = Convert.ToString(propertyValue[1]);
                teachers.Add(teacher);
            }
            return teachers;
        }


        /// <summary>
        /// 查询指导|审题老师意见
        /// </summary>
        /// <param name="sno">学号</param>
        /// <param name="thesisid">论题号</param>
        /// <returns></returns>
        public List<string> QueryTeacherOpinionBll(string sno, long thesisid)
        {
            List<string>list=new List<string>();
            SqlParameter snoParameter=new SqlParameter("@sno",sno);
            SqlParameter thesisParameter=new SqlParameter("@thesis_id",thesisid);
            DataTable dt = SqlHelper.ExecuteDataTableProc("QueryTeacherOpinion",new SqlParameter[] {snoParameter,thesisParameter});
            foreach (DataRow row in dt.Rows)
            {
                foreach (DataColumn column in dt.Columns)
                {
                    list.Add(Convert.ToString(row[column]));
                }
            }
            return list;
        }


        /// <summary>
        /// 根据学号查询已选论题的论题号
        /// </summary>
        /// <param name="sno"></param>
        /// <returns></returns>
        public long QueryThesisId(string sno)
        {
            string sql = "select TopicId from choose where Sno=@sno";
            SqlParameter snoParameter=new SqlParameter("@sno",sno);
            var r = SqlHelper.ExecuteScalar(sql, new SqlParameter[] {snoParameter});
            long result=-1;
            try
            {
                result = Convert.ToInt64(r);
            }
            catch (Exception)
            {
                
                throw;
            }
            return result;
        }


        /// <summary>
        /// 查询学生已选的论题信息
        /// </summary>
        /// <param name="sno"></param>
        /// <returns></returns>
        public PersonalThesis QueryThesisInfo(string sno)
        {
            SqlParameter snoParameter=new SqlParameter("@sno",sno);
            PersonalThesis pt=new PersonalThesis();
            DataTable dt = SqlHelper.ExecuteDataTableProc("QueryThesisOfStudent", new SqlParameter[] {snoParameter});
            if (dt.Rows.Count<1)
            {
                return null;
            }
            else
            {
                #region 查询结果非空
                Object[] values = new object[dt.Columns.Count];
                foreach (DataRow row in dt.Rows)
                {
                    
                    int index = 0;
                    foreach (DataColumn column in dt.Columns)
                    {
                        values[index++] = row[column];
                    }
                    break;
                }
                try
                {
                    pt.thesisId = Convert.ToInt64(values[0]);
                    pt.name = Convert.ToString(values[1]);
                    pt.type = Convert.ToString(values[2]);
                    pt.content = Convert.ToString(values[3]);
                    pt.response = Convert.ToString(values[4]);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    throw e;
                }
                #endregion
                return pt;
            }
        }


        /// <summary>
        /// 查询论题被审核的次数和审题员同意论题通过的人数
        /// </summary>
        /// <param name="thesisid"></param>
        /// <returns></returns>
        public int[] QueryThesisStatus(long thesisid)
        {
            SqlParameter idParameter=new SqlParameter("@thesis_no",thesisid);
            DataTable dt = SqlHelper.ExecuteDataTableProc("QueryThesisStatus", new SqlParameter[] {idParameter});
            int[] res = new int[dt.Columns.Count];
            foreach (DataRow row in dt.Rows)
            {
                int index = 0;
                foreach (DataColumn column in dt.Columns)
                {
                    res[index] = Convert.ToInt32(row[column]);
                    //
                    if (res[index]==0)
                    {
                        res[index + 1] = 0;
                        break;
                    }
                    index++;
                }
                break;
            }
            return res;
        }


        /// <summary>
        /// 查询学生是否已经选题
        /// </summary>
        /// <param name="sno">学生学号</param>
        /// <returns></returns>
        public bool HasChooseThesis(string sno)
        {
            SqlParameter snoParameter=new SqlParameter("@sno", sno);
            return Convert.ToInt32(
                SqlHelper.ExecuteScalarProc("HasChoosedThesis", new SqlParameter[] {snoParameter})) >0
                ? true
                : false;
        }
    }



}