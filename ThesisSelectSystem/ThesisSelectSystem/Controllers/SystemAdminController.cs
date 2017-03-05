using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Model;
using ThesisSelectSystem.BLL;
using ThesisSelectSystem.DAL;
using ThesisSelectSystem.DAL.MyHelp;
using ThesisSelectSystem.Filter.HurricanFilter;

namespace ThesisSelectSystem.Controllers
{
    //[LoginActionFilter]
    [SystemAdminActionFilter]
    public class SystemAdminController : Controller
    {
        private string filename;
        private static string xmlPath = AppDomain.CurrentDomain.BaseDirectory + "TableMappingObj.xml";
        private static string asmPathAndName = AppDomain.CurrentDomain.BaseDirectory + @"\bin\Model.dll";


        public ActionResult Index()
        {
            string account = (string)Session["Account"];
            ViewBag.data = account;
            return View();
        }



        /// <summary>
        /// 初始化系统管理员界面信息
        /// </summary>
        /// <returns></returns>
        public ActionResult SystemAdministrator()
        {
            List<string> majorNames = new MajorTableHelper().GetMajorName();
            ViewBag.Data = majorNames;

            List<string> classnames=
                new ClassesTableHelper().ListClassName(Convert.ToInt32(HttpContext.Application["userYear"]));
            ViewBag.ClassName = classnames;

            List<string> departList = new DepartmentTableHelper().ListDepartmentName();
            ViewBag.departments = departList;

            SqlParameter parameter=new SqlParameter("@condition",SqlDbType.NVarChar);
            parameter.Value = "管理员";

            Dictionary<string, string> teachersName =
                new TeacherInfoQuery().QueryTeacherNameAndAccount();
            ViewBag.teacherName = teachersName.Values.ToArray();
            ViewBag.teacherID = teachersName.Keys.ToArray();
            ViewBag.teacherCount = teachersName.Values.ToArray().Length;

            TeacherInfoDetail[] teacherInfoDetails =
                new TeacherInfoQuery().QueryTeacherInfoDetails(new SqlParameter[] {parameter});
            string[] adminID = teacherInfoDetails.Select(entity => (entity.id)).ToArray();
            string[] adminName = teacherInfoDetails.Select(entity => (entity.name)).ToArray();
            string[] departmentName = teacherInfoDetails.Select(entity => (entity.departmentName)).ToArray();
            ViewBag.adminIds = adminID;
            ViewBag.adminNames = adminName;
            ViewBag.departmentNames = departmentName;
            ViewBag.adminCount = adminID.Length;

            List<Announcement> announcements = new Anouncement_bll().QueryAnnouncementsByDay(30);
            ViewBag.announcementTitles = announcements.Select(a => a.title).ToArray();
            ViewBag.announcementIds = announcements.Select(a => a.aid).ToArray();
            ViewBag.announceTime = announcements.Select(a => a.times).ToArray();


            return View();
        }



        /// <summary>
        /// ajax请求添加专业
        /// </summary>
        /// <param name="major"></param>
        /// <param name="department"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddMajor(string major,string department)
        {
            var  helper=new MajorTableHelper();
            if (helper.IsNoExistSameMajorName(major))
            {
                helper.AddMajor(major, department);
                return Json(new {name=major,depart=department});
            }
            else
            {
                return Json(new { message = "添加新专业失败" });
            }
            
        }


        /// <summary>
        /// 删除专业
        /// </summary>
        /// <returns></returns>
        public ActionResult DelMajor()
        {
            var message = Request["test"];
            string[] majornames = message.Split(',');
            var  helper=new MajorTableHelper();
            int affectLine= helper.DelMajor(majornames);
            if (affectLine>0)
            {
                return Json(new { message = "成功删除" +message+"专业"});
            }
            else
            {
                return Json(new { message = "删除" + message +"失败"});
            }
            
        }



        /// <summary>
        /// 添加二级学院
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddDepartment(string text)
        {
            string message=new DepartmentTableHelper().AddDepartment(text);
            return Json(new {result = message});
        }



        /// <summary>
        /// ajax请求添加班级
        /// </summary>
        /// <returns></returns>
        public ActionResult AddClass()
        {
            bool result;
            Classes classes=new Classes();
            classes.className = Convert.ToString(Request["className"]);
            classes.graduateYear = Convert.ToInt32(Request["year"]);
            classes.humanNumber = Convert.ToInt32(Request["number"]);
            DbOperation.Save(classes, "classes", out result);
            if (result)
            {
                return Json(new { tip = "成功添加班级" });
            }
            else
            {
                return Json(new { tip = "添加班级失败，添加的班级已经存在，请刷新网页重试" });
            }       
        }



        /// <summary>
        /// ajax请求删除班级
        /// </summary>
        /// <returns></returns>
        public ActionResult DeleteClass()
        {
            string className = Request["classNames"];
            StringBuilder tip=new StringBuilder();
            var classBll=new ClassManage_Bll();
            if (!String.IsNullOrEmpty(className))
            {
                string[] names = className.Split(new[] {','});
                for (int i = 0; i < names.Length; i++)
                {
                    tip.Append(classBll.DeleteClass(names[i])).Append("\n");
                }
            }
            else
            {
                tip.Append("删除失败！");
            }
            return Json(new {tip = tip.ToString()});
        }


        /// <summary>
        ///  测试导入教师信息页面
        /// </summary>
        /// <returns></returns>
        public ActionResult UploadTeacherTable()
        {

            return View();
        }


        
        /// <summary>
        /// 接收客户端上传的Excel文件并把Excel表格里的数据导入数据库相应的表
        /// </summary>
        /// <returns></returns>
        public ActionResult ReceiveFile()
        {
            HttpPostedFileBase file = Request.Files["files"];
            filename = Path.GetFileName(file.FileName);
            string fileExtensionName = Path.GetExtension(file.FileName);
            string serverFileName = ExcelFileBusinessOperation.CreatePrefixion()+ filename;
            string virtualPath = "/ExcelFiles/" + serverFileName;
            
            string savePath = Server.MapPath(virtualPath);
            if (fileExtensionName == ".xls" || fileExtensionName == ".xlsx" || fileExtensionName == ".xlsm")
            {
                try
                {
                    file.SaveAs(savePath);
                    DbOperation.SetXmlPath(xmlPath);
                    bool result;
                    var students = ExcelFileBusinessOperation.ExcelToList(savePath, "Sheet1", asmPathAndName, "Model.Student");
                    foreach (var student in students)
                    {
                        if (student is Model.Student)
                        {
                            DbOperation.Save(student, "student", out result);
                            User_dal.CreateNewUser(((Student) student).sno);
                        }
                    }
                }
                catch (Exception)
                {
                    
                    throw;
                } 
                return Json(new {tip = "导入学生信息成功"});
            }
            else
            {
                string errorMessage = "请不要上传excel以外的文件";
                return Json(new {tip = errorMessage});
            }

        }



        /// <summary>
        /// 导入教师信息
        /// </summary>
        /// <returns></returns>
        public ActionResult ImportTeacherInfo()
        {
            HttpPostedFileBase file = Request.Files["teacherInfo"];
            filename = Path.GetFileName(file.FileName);
            string fileExtensionName = Path.GetExtension(file.FileName);
            string serverFileName = ExcelFileBusinessOperation.CreatePrefixion() + filename;
            string virtualPath = "/ExcelFiles/" + serverFileName; 
            string savePath = Server.MapPath(virtualPath);
            if (fileExtensionName == ".xls" || fileExtensionName == ".xlsx" || fileExtensionName == ".xlsm")
            {
                try
                {
                    file.SaveAs(savePath); 
                    List<Object> teachers = ExcelFileBusinessOperation.ExcelToList(savePath, "teacher", asmPathAndName, "Model.Teacher");
                    DbOperation.SetXmlPath(xmlPath);
                    foreach (var teacher in teachers)
                    {
                        bool result;
                        if (teacher is Teacher)
                        {
                            DbOperation.Save(teacher, "teacher", out result);
                            User_dal.CreateNewUser(((Teacher) teacher).id ,"老师");


                        }
                    }
                }
                catch (Exception)
                {
                    return Json(new { tip = "导入教师信息出错" });
                    throw;
                }
                return Json(new { tip = "成功导入教师信息" });
            }
            else
            {
                string errorMessage = "请不要上传excel以外的文件";
                return Json(new { tip = errorMessage });
            }
           
        }


        /// <summary>
        /// 添加管理员
        /// </summary>
        /// <returns></returns>
        public JsonResult AddAdmin()
        {
            var teacherId = Request["id"];
            bool result;
            UserInfo user=new UserInfo();
            user.account = teacherId;
            user.roles = "管理员";
            DbOperation.SetXmlPath(xmlPath);
            result = DbOperation.Update(user,"userinfo");
            if (result)
            {
                return Json(new { tip = "成功添加管理员" });
            }
            else
            {
                return Json(new { tip = "添加管理员失败" });
            }
        }


        /// <summary>
        /// 删除管理员
        /// </summary>
        /// <returns></returns>
        public ActionResult DeleteAdmin()
        {
            var adminId = Request["id"];
            
            UserInfo user=new UserInfo();
            user.account = adminId;
            user.roles = "教师";
            DbOperation.SetXmlPath(xmlPath);
            bool result = DbOperation.Update(user,"userinfo");
            if (result)
            {
                return Json(new { tip = "成功删除管理员" });
            }
            else
            {
                return Json(new { tip = "操作失败！" });
            }
            
        }


        [ValidateInput(false)]
        public ActionResult AnnounceAnnouncement()
        {
            var title = Request["title"];
            var contents = Server.HtmlEncode(Request["contents"]);
            var scope = Request["scope"];
            Announcement announcement=new Announcement();
            announcement.contents = contents;
            announcement.scope = scope;
            announcement.status = "已发布";
            announcement.times = DateTime.Now;
            announcement.title = title;
            DbOperation.SetXmlPath(xmlPath);
            bool result;
            DbOperation.Save(announcement, "announcement", out result);
            if (result)
            {
                return Json(new { tip = "公告发布成功" });
            }
            else
            {
                return Json(new { tip = "操作失败" });
            }
            
        }


        /// <summary>
        /// 设置毕业年份
        /// </summary>
        /// <returns></returns>
        public ActionResult SetUpGraduateYear()
        {
            int year = Convert.ToInt32(Request["graduateYear"]);
            HttpContext.Application["userYear"] = year;
            return Json(new {tip = "成功设置毕业年份"});
        }
    }
}