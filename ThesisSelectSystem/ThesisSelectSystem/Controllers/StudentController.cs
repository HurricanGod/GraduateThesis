using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ThesisSelectSystem.BLL;
using ThesisSelectSystem.Filter.HurricanFilter;

namespace ThesisSelectSystem.Controllers
{
    [StudentActionFilter]
    public class StudentController : Controller
    {
        //
        // GET: /Student/
        public ActionResult Index()
        {
            var bll=new StudentBll();
            string account = Session["account"].ToString();
            ViewBag.username = bll.GetName(account);
            return View();
        }

        public ActionResult TeacherThesisDetail()
        {
            return View();
        }


        public ActionResult QueryTeacherThesis()
        {
            int usingYear = Convert.ToInt32(HttpContext.Application["userYear"]);
            var thesisList = new StudentBll().QueryTeacherThesisBll(usingYear);
            return Json(thesisList);
        }

    }
}