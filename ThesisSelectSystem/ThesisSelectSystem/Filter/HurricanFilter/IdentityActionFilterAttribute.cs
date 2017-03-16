using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ThesisSelectSystem.DAL;

namespace ThesisSelectSystem.Filter.HurricanFilter
{
    public class IdentityActionFilterAttribute:ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            string identity = (string) filterContext.HttpContext.Session["Identity"];
            string role = (string) filterContext.HttpContext.Session["Role"];
            if (!identity.Equals("审题员")&&!role.Equals("管理员"))
            {
                filterContext.Result = new JsonResult() { Data = new {tip = "你不是审题员，没有权限审题" } };
            }
            base.OnActionExecuted(filterContext);
        }
    }
}