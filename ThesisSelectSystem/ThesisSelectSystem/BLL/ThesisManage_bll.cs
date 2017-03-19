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
            return new ThesisDal().QueryChoosedGuidingStudent("HasChoosedStudentList", new SqlParameter[] {yearParameter, guiderIdParameter});

        }

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
    }
}