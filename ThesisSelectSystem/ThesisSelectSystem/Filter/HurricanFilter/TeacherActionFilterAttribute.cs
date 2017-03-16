using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.WebPages;
using Model;
using ThesisSelectSystem.DAL;

namespace ThesisSelectSystem.Filter.HurricanFilter
{
    public class TeacherActionFilterAttribute:ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string account = (string)filterContext.HttpContext.Session["Account"];
            if (account.IsEmpty())
            {
                filterContext.Result=new RedirectResult("/Login/STLogin");
            }
            else
            {
                string role = (string)filterContext.HttpContext.Session["Role"];
                if (role.IsEmpty()||!role.Equals("教师"))
                {
                    filterContext.Result = new RedirectResult("/Login/STLogin");
                }
            }
            base.OnActionExecuting(filterContext);
        }
    }
}