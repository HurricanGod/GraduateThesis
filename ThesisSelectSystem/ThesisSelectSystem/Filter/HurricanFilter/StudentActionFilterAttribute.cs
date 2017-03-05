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
    public class StudentActionFilterAttribute: ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string account = (string)filterContext.HttpContext.Session["Account"];
            if (account.IsEmpty())
            {
                filterContext.Result = new RedirectResult("/Login/STLogin");
            }
            else
            {
                UserInfo user = User_dal.GetPswAndRoleAndSaltModel(account);
                if (user.roles != "学生")
                {
                    filterContext.Result = new RedirectResult("/Login/STLogin");
                }
            }
            base.OnActionExecuting(filterContext);
        }

    }
}