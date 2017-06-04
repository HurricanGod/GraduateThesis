using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using ThesisSelectSystem.BLL;
using ThesisSelectSystem.DAL;
using ThesisSelectSystem.Filter.HurricanFilter;
using ThesisSelectSystem.Models;

namespace ThesisSelectSystem.Controllers
{
    [StudentActionFilter]
    public class StudentController : Controller
    {
        /// <summary>
        /// 返回一个学生选题主页面
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            var bll=new StudentBll();
            string account = Session["account"].ToString();
            long thesisid = bll.QueryThesisId(account);
            List<string> list = bll.QueryTeacherOpinionBll(account, thesisid);
            PersonalThesis thesis = bll.QueryThesisInfo(account);
            thesis = thesis ?? new PersonalThesis(-1, "", "", "", "");
            int[] weight = bll.QueryThesisStatus(thesisid);
            int passWeight = Convert.ToInt32(HttpContext.Application["pastWeight"]);
            #region 论题状态判断
            string thesisStatus = "";
            if (weight[0] < 1)
            {
                thesisStatus = "暂时没有课题信息";
            }
            else if (weight[0]>0&&weight[1]<passWeight)
            {
                thesisStatus = "课题审核中";
            }
            else if(weight[1] >= passWeight)
            {
                thesisStatus = "课题审核通过";
            }
            else if (weight[0] == passWeight && weight[1] < passWeight)
            {
                thesisStatus = "审核不通过";
            }
            #endregion
            ViewBag.status = thesisStatus;
            ViewBag.thesisInfo = thesis;
            ViewBag.advertise = list;
            ViewBag.username = bll.GetName(account);
            ViewBag.sno = account;
            return View();
        }


        /// <summary>
        /// 返回一个论题详细内容页面
        /// </summary>
        /// <param name="id">论题号</param>
        /// <returns></returns>
        public ActionResult TeacherThesisDetail(long id)
        {
            Thesis thesis = (Thesis)DbOperation.QueryById(typeof(Thesis), id, "thesis");
            ViewBag.thesisinfo = thesis;
            return View();
        }



        /// <summary>
        /// 查询毕业年份为x，审核通过的教师拟定的论题
        /// </summary>
        /// <returns></returns>
        public ActionResult QueryTeacherThesis()
        {
            int usingYear = Convert.ToInt32(HttpContext.Application["userYear"]);
            var thesisList = new StudentBll().QueryTeacherThesisBll(usingYear);
            return Json(thesisList, JsonRequestBehavior.AllowGet);
        }


        /// <summary>
        /// 选题页面查询所有的指导老师名字
        /// </summary>
        /// <returns></returns>
        public ActionResult QueryGuiders()
        {
            List<Teacher> list = new StudentBll().QueryGuiders();
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        /// <summary>
        /// 申请/取消自拟题
        /// </summary>
        /// <param name="isMakeThesis"></param>
        /// <returns></returns>
        public ActionResult ApplyForMakeThesis(string isMakeThesis)
        {
            Student student=new Student();
            student.sno = Session["account"].ToString();
            bool exeuteResult;
            if (isMakeThesis == "1")
            {
                student.whetherMakeTopic = "是";
            }
            else
            {
                student.whetherMakeTopic = "否";
            }
            exeuteResult = DbOperation.Update(student, "student");
            return Json(new {tip = exeuteResult});
        }


        /// <summary>
        /// 查询学生是否已经选题
        /// </summary>
        /// <returns></returns>
        public ActionResult QueryWhetherChooseThesis()
        {
            string sno = Session["account"].ToString();
            bool flag = new StudentBll().HasChooseThesis(sno);
            return Json(new { isChoose = flag});
        }
    }
}