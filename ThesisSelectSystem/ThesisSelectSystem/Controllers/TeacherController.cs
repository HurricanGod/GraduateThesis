using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Web;
using System.Web.Mvc;
using Model;
using ThesisSelectSystem.DAL;
using ThesisSelectSystem.Filter.HurricanFilter;

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
            List<Thesis> thesisList = new ThesisDal().QueryTeacherThesis(teacherId, usingYear, "待审核");
            ViewBag.teacherThesisNo = thesisList.Select(thesis => thesis.topicId).ToArray();
            ViewBag.teacherThesisName = thesisList.Select(thesis => thesis.topicTitle).ToArray();
            ViewBag.teacherThesisType = thesisList.Select(thesis => thesis.topicType).ToArray();
            ViewBag.recordLength = thesisList.Select(thesis => thesis.topicId).ToArray().Length;
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

    }
}