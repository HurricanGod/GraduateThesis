using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Web;
using System.Web.Mvc;
using Model;
using ThesisSelectSystem.BLL;
using ThesisSelectSystem.DAL;
using ThesisSelectSystem.Filter.HurricanFilter;
using ThesisSelectSystem.Models;

namespace ThesisSelectSystem.Controllers
{
    [TeacherActionFilter]
    public class TeacherController : Controller
    {
        //
        // GET: /Teacher/
        
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Teacher()
        {
            string teacherId = (string)Session["Account"];
            int usingYear = Convert.ToInt32(HttpContext.Application["userYear"]);
            ThesisDal thesisInit=new ThesisDal();
            List<Thesis> thesisList = thesisInit.QueryTeacherThesis(teacherId, usingYear, "待审核");
            ViewBag.teacherThesisNo = thesisList.Select(thesis => thesis.topicId).ToArray();
            ViewBag.teacherThesisName = thesisList.Select(thesis => thesis.topicTitle).ToArray();
            ViewBag.teacherThesisType = thesisList.Select(thesis => thesis.topicType).ToArray();
            ViewBag.recordLength = thesisList.Select(thesis => thesis.topicId).ToArray().Length;
            List<PartOfThesis> unPassExamineThesis = thesisInit.QueryAllNotPassExamineTesis(usingYear);
            ViewBag.unExamineThesisId = unPassExamineThesis.Select(a => a.topicId).ToArray();
            ViewBag.unExamineThesisMaker = unPassExamineThesis.Select(a => a.makerName).ToArray();
            ViewBag.unExamineThesisTitle = unPassExamineThesis.Select(a => a.topicTitle).ToArray();
            ViewBag.unExamineThesisSource = unPassExamineThesis.Select(a => a.topicSources).ToArray();
            ViewBag.unExamineThesisType = unPassExamineThesis.Select(a => a.topicType).ToArray();
            ViewBag.unExamineThesisMaxCount = unPassExamineThesis.Select(a => a.maxOptionalNumber).ToArray();
            return View();
        }


        /// <summary>
        /// 保存教师拟题
        /// </summary>
        /// <returns></returns>
        public ActionResult SaveTeacherThesis()
        {
            Thesis teacherThesis=new Thesis();
            bool result;
            teacherThesis.topicTitle = Request["title"];
            teacherThesis.topicType = Request["type"];
            teacherThesis.topicContext = Request["content"];
            teacherThesis.maxOptionalNumber = Convert.ToInt32(Request["number"]);
            teacherThesis.usingYear = Convert.ToInt32(Request["year"]);
            teacherThesis.isChoice = 1;
            teacherThesis.topicMakerId = (string)Session["Account"];
            teacherThesis.topicSources = "教师拟题";
            teacherThesis.topicStatus = "待审核";
            DbOperation.Save(teacherThesis, "thesis", out result);
            if (result)
            {
                return Json(new { tip = "成功添加题目" });
            }
            else
            {
                return Json(new { tip = "添加题目操作失败" });
            }

            
        }


        public ActionResult DeleteThesis()
        {
            int id = Convert.ToInt32(Request["id"]);
            Thesis thesis=new Thesis();
            thesis.topicId = id;
            bool res = DbOperation.Delete(thesis, "thesis");
            if (res)
            {
                return Json(new { tip = "成功删除论题" });
            }
            else
            {
                return Json(new { tip = "删除失败，要删除的论题不存在" });
            }
            
        }


        /// <summary>
        /// 点击审查时查询并显示课题详细内容
        /// </summary>
        /// <returns></returns>
        public ActionResult ShowThesisDetail()
        {
            int thesisId = Convert.ToInt32(Request["thesisId"]);
            Thesis thesis=new Thesis();
            thesis = (Thesis) DbOperation.QueryById(thesis.GetType(), thesisId, "thesis");
            ViewBag.title = thesis.topicTitle;
            ViewBag.source = thesis.topicSources;
            ViewBag.type = thesis.topicType;
            ViewBag.content = thesis.topicContext;
            return View();
        }


        /// <summary>
        /// 教师同意学生选定自己做指导老师
        /// </summary>
        /// <returns></returns>
        public ActionResult ChooseStudents()
        {
            return Json(new {});
        }



        /// <summary>
        /// 时间：2017年3月14日 19:38:27
        /// 审题员审题，主要业务存放在数据库的存储过程中，审题步骤如下：
        /// 1.获取全局变量passWeight，该变量表示论题通过审核需要最低的分数
        /// 2.获取审题员id
        /// 3.事务操作：保存审题员的审题记录、更新论题状态信息
        /// 4.返回数据库操作结果
        /// </summary>
        /// <param name="advice"></param>
        /// <param name="isPass"></param>
        /// <param name="thesisId"></param>
        /// <returns></returns>
        [IdentityActionFilter(Order = 2)]
        public ActionResult CheckThesis(string advice,string isPass,string thesisId)
        {
            int passWeight = Convert.ToInt32(HttpContext.Application["pastWeight"]);
            string analyzerId = Convert.ToString(Session["Account"]);
            string identity = (string)Session["Identity"];
            var thesisBll=new ThesisManage_bll();
            bool res = thesisBll.AnalyzeThesis(advice, isPass, thesisId, passWeight, analyzerId,identity,3);

            if (res)
            {
                return Json(new { tip = "审核完成" });
            }
            else
            {
                return Json(new { tip = "事务操作失败" });
            }
            
        }

        /// <summary>
        /// 查询毕业年份为usingYear、选择了编号为teacherId的老师作为指导老师的所有非自拟题学生姓名及毕业论题名称
        /// </summary>
        /// <returns></returns>
        public ActionResult QueryChooseTeacherThesisInfo()
        {
            var usingYear = HttpContext.Application["userYear"];
            var teacherId = Session["Account"];
            Object[] args = new[] {usingYear, teacherId, "否" };
            List<ChooseTeacherThesis> resultList = new ThesisManage_bll().QueryChooseTeacherThesisInfo("QueryUnDrawUpThesis", args);
            return Json(resultList);
        }

    }
}