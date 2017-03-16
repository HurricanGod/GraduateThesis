using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.WebPages;
using Model;
using ThesisSelectSystem.Filter;
using ThesisSelectSystem.BLL;
using ThesisSelectSystem.DAL;

namespace ThesisSelectSystem.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/


        /// <summary>
        /// 学生与教师登陆界面，Student&Teacher
        /// </summary>
        /// <returns></returns>
        
        public ActionResult STLogin()
        {
            
            return View();
        }


        /// <summary>
        /// 管理员与审题员登陆界面，Admin&Inpector
        /// </summary>
        /// <returns></returns>
        public ActionResult AILogin()
        {
            return View();
            
           
        }


        /// <summary>
        /// 系统管理员登陆界面,SystemAdmin
        /// </summary>
        /// <returns></returns>
        public ActionResult SALogin()
        {   

            return View();
        }


        /// <summary>
        /// 管理员登录检查
        /// </summary>
        /// <returns></returns>
        public ActionResult SystemAdminMakeLogin()
        {
            string Account = Request["Account"];
            string Password = Request["Password"];
            string roles;
            
            UserLogin_bll user = new UserLogin_bll();
            bool login = user.LoginYes(Account, Password,out roles);
            if (login && roles == "管理员")
            {
                Session["Account"] = Account;
                Session["Role"] =roles;
                DbOperation.SetXmlPath(AppDomain.CurrentDomain.BaseDirectory + "TableMappingObj.xml");
                return Content("1");
            }   
            else
                return Content("0");
            
        }


        /// <summary>
        /// 教师、学生登录检查
        /// </summary>
        /// <returns></returns>
        public ActionResult CheckStLoginInfo()
        {
            string account = Request["account"];
            string password = Request["password"];
            string clientRole= Request["role"];
            string realRole;
            bool whetherLegal=new UserLogin_bll().LoginYes(account,password,out realRole);
            if (whetherLegal&&clientRole==realRole)
            {
                Session["Account"] = account;
                Session["Role"] = realRole;
                DbOperation.SetXmlPath(AppDomain.CurrentDomain.BaseDirectory + "TableMappingObj.xml");
                if (realRole.Equals("教师"))
                {
                    Teacher teacher = (Teacher)DbOperation.QueryById(typeof (Teacher), account, "teacher");
                    string identity = teacher.specialIdentity.IsEmpty() ? "教师" : teacher.specialIdentity;
                    Session["Identity"] = identity;
                }
                return Json(new {tip= "成功登录" ,role=realRole});
            }
            else
            {
                return Json(new {tip= "密码错误" });
            }
            
        }

    }
}