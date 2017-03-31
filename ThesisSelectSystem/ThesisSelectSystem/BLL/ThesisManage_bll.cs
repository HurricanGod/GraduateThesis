using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ThesisSelectSystem.DAL;
using ThesisSelectSystem.Models;

namespace ThesisSelectSystem.BLL
{
    public class ThesisManage_bll
    {

        /// <summary>
        /// 审核人员操作审题业务
        /// </summary>
        /// <param name="advice">对审核不通过的论题的修改意见</param>
        /// <param name="isPass">审核论题给的结果</param>
        /// <param name="thesisId">论题唯一标识</param>
        /// <param name="passWeight">审核通过取得的分数</param>
        /// <param name="analyzerId">审核人员的id</param>
        /// <param name="specialIdentity">审核人员的特殊身份</param>
        /// <param name="specialScore">审核人员审核论题给出的特殊分值</param>
        /// <returns></returns>
        public bool AnalyzeThesis(string advice, string isPass, string thesisId,int passWeight, string analyzerId,string specialIdentity,int specialScore)
        {
            int giveWeight = isPass == "pass" ? 1 : 0;
            giveWeight = specialIdentity.Equals("管理员") ? specialScore : giveWeight;
            SqlParameter topicIdParameter=new SqlParameter("@topic_id", SqlDbType.BigInt);
            topicIdParameter.Value = Convert.ToInt64(thesisId);
            SqlParameter analyserIdParameter=new SqlParameter("@analyzer_id",analyzerId);
            SqlParameter suggestionParameter=new SqlParameter("@suggestion",advice);
            SqlParameter weightParameter=new SqlParameter("@weight",giveWeight);
            SqlParameter passWeightParameter=new SqlParameter("@pass_weight",passWeight);
            SqlParameter[] sqlParameters = new[]
            {
                topicIdParameter, analyserIdParameter, suggestionParameter,
                weightParameter, passWeightParameter
            };
            return SqlHelper.ExecuteNonqueryProc("CheckThesis", sqlParameters) > 0 ? true : false;
           
        }


        /// <summary>
        /// 查询选了指导老师非自拟题学生的学号、姓名、课题号、课题名
        /// </summary>
        /// <param name="proc">存储过程名称</param>
        /// <param name="parameters">存储过程占位符参数，主要有@year、@teacherId、@isagree</param>
        /// <returns></returns>
        public List<ChooseTeacherThesis> QueryChooseTeacherThesisInfo(string proc,Object[] parameters)
        {
            var chooseThesisDal=new ThesisDal();
            SqlParameter yearParameter=new SqlParameter("@year", parameters[0]);
            SqlParameter teacherIdParameter=new SqlParameter("@teacherId",parameters[1]);
            SqlParameter isAgreeParameter=new SqlParameter("@isagree",parameters[2]);
            SqlParameter[] args = new[] {yearParameter, teacherIdParameter, isAgreeParameter};
            return chooseThesisDal.QueryChooseTeacherThesisInfo(proc, args);
        }

        /// <summary>
        /// 查询教师已经同意指导非自拟题学生的姓名、班级、论题名、论题来源
        /// </summary>
        /// <param name="year">论题的使用年份</param>
        /// <param name="guiderId">教师ID</param>
        /// <returns></returns>
        public List<TGuidingStudentInfo> QueryChoosedGuidingStudent(int year,string guiderId)
        {
            SqlParameter yearParameter=new SqlParameter("@year",year);
            SqlParameter guiderIdParameter=new SqlParameter("@guiderId",guiderId);
            return new ThesisDal().QueryChoosedGuidingStudent("HasChoosedStudentList", 
                new SqlParameter[] {yearParameter, guiderIdParameter});

        }

        /// <summary>
        /// 查询教师已经同意指导自拟题学生的姓名、班级、论题名、论题来源
        /// </summary>
        /// <param name="year">论题的使用年份</param>
        /// <param name="guiderId">教师ID</param>
        /// <returns></returns>
        public List<TGuidingStudentInfo> QueryStudentWhoMakeThesisBeChoosedByTeacher(int year, string guiderId)
        {
            SqlParameter yearParameter = new SqlParameter("@year", year);
            SqlParameter guiderIdParameter = new SqlParameter("@guiderId", guiderId);
            SqlParameter sourcesParameter=new SqlParameter("@sources","学生拟题");
            SqlParameter isMakeThesisParameter=new SqlParameter("@is_make_thesis","是");
            return new ThesisDal().QueryChoosedGuidingStudent("StudentList", new SqlParameter[]
            {yearParameter, guiderIdParameter, sourcesParameter, isMakeThesisParameter});
        }

        /// <summary>
        /// 教师同意学生选定自己做导师
        /// </summary>
        /// <param name="proc"></param>
        /// <param name="teacherid"></param>
        /// <param name="other">other为SnoAndThesis的集合，集合中每一个元素存放学号和课题号</param>
        /// <returns></returns>
        public bool ExecuteTeacherChooseStudentTran(string proc, string teacherid, List<SnoAndThesis> other)
        {
            int count = 0;
            
            foreach (SnoAndThesis o in other)
            {
                SqlParameter sno=new SqlParameter("@student_no", o.sno);
                SqlParameter thesisid=new SqlParameter("@thesis_no",Convert.ToInt64(o.thesisid));
                SqlParameter teacheridParameter = new SqlParameter("@tutor_no", teacherid);
                count = new ThesisDal().ExecuteChooseStudentTran(proc,
                    new SqlParameter[] {sno, teacheridParameter, thesisid})
                    ? count + 1
                    : count;
            }
            return count == other.Count ? true : false;
        }


        /// <summary>
        /// 根据年份和教师ID查询教师所选择指导的学生的学号、姓名、选的毕业论题号、论题名称
        /// </summary>
        /// <param name="guiderid"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public List<ChoosedThesisStuNameList> QueryTeacherChooseAllOfStudent(string guiderid,int year)
        {
            SqlParameter yearParameter = new SqlParameter("@year", year);
            SqlParameter guideridParameter=new SqlParameter("@guiderId",guiderid);
            return new ThesisDal().QueryTeacherChooseAllOfStudent("QueryTeacherChooseAllOfStudent",
                new SqlParameter[] {yearParameter, guideridParameter});

        }

        public bool ExecuteTeacherWithDrawStudentTran(string sno, long thesisid,string opinion)
        {
            SqlParameter snoParameter =new SqlParameter("@student_no", sno);
            SqlParameter thesisidParameter=new SqlParameter("@thesis_no",thesisid);
            SqlParameter opinionParameter=new SqlParameter("@guider_suggestion",opinion);
            return SqlHelper.ExecuteNonqueryProc
                ("TeacherWithdrawStudent", new SqlParameter[] {snoParameter, thesisidParameter, opinionParameter})
                   > 0
                ? true
                : false;
        }


    }
}