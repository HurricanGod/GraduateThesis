using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ThesisSelectSystem.DAL;

namespace ThesisSelectSystem.Filter.HurricanFilter
{
    public class LoginActionFilterAttribute:ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            
            base.OnActionExecuted(filterContext);
        }
    }
}