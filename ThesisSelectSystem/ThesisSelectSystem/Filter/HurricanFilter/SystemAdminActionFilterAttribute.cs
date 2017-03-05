using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using ThesisSelectSystem.DAL;


namespace ThesisSelectSystem.Filter.HurricanFilter
{
    [AttributeUsage(AttributeTargets.Class|AttributeTargets.Method,AllowMultiple = true,Inherited = true)]
    public class SystemAdminActionFilterAttribute:ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string account = (string)filterContext.HttpContext.Session["Account"];
            if (account ==null)
            {
                filterContext.Result = new RedirectResult("/Login/SALogin");
            }
            else
            {
                UserInfo user=User_dal.GetPswAndRoleAndSaltModel(account);
                if (user.roles!="管理员")
                {
                    filterContext.Result = new RedirectResult("/Login/SALogin");
                }
            }
            base.OnActionExecuting(filterContext);

        }
    }
}