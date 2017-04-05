using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ThesisSelectSystem.DAL;
using ThesisSelectSystem.Models;

namespace ThesisSelectSystem.BLL
{
    public class StudentBll
    {
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
    }



}