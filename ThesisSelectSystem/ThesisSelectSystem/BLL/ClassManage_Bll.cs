using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThesisSelectSystem.DAL.MyHelp;
using ThesisSelectSystem.Models;

namespace ThesisSelectSystem.BLL
{
    public class ClassManage_Bll
    {
        /// <summary>
        /// 添加班级
        /// </summary>
        /// <param name="className">要添加的班级名称</param>
        /// <returns></returns>
        public string SaveClass(string className)
        {
            string tip;
            ClassesTableHelper classesTableHelper = new ClassesTableHelper();
            bool isUnique = classesTableHelper.ClassNameIsUnique(className);
            if (isUnique)
            {
                if (classesTableHelper.AddClass(className))
                {
                    tip = "添加班级成功";
                }
                else
                {
                    tip = "添加班级失败";
                }
            }
            else
            {
                tip = "已经存在名为 " + className + " 的班级名称";
            }
            return tip;
        }


        /// <summary>
        /// 删除指定班级名称的班级
        /// </summary>
        /// <param name="className">要删除的班级名称</param>
        /// <returns></returns>
        public string DeleteClass(string className)
        {
            string tip;
            if (new ClassesTableHelper().DeleteClass(className))
            {
                tip = "成功删除班级：" + className;
            }
            else
            {
                tip = "请刷新网页检查要删除的班级是否已经删除";
            }
            return tip;
        }


        
    }
}