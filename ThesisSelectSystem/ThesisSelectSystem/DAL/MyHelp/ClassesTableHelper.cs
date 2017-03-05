using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.WebPages;
using Model;
using ThesisSelectSystem.Models;

namespace ThesisSelectSystem.DAL.MyHelp
{
    public  class ClassesTableHelper
    {

        /// <summary>
        /// 检查班级名是否在数据库里是唯一的
        /// </summary>
        /// <param name="className"></param>
        /// <returns></returns>
        public bool ClassNameIsUnique(string className)
        {
            SqlParameter parameter=new SqlParameter("@ClassName",SqlDbType.NVarChar);
            parameter.Value = className;
            int recordNum = (int)SqlHelper.ExecuteScalarProc("IsExistClassName", new SqlParameter[] {parameter});
            return recordNum > 0 ? false : true;
        }


        /// <summary>
        /// 根据专业名查找专业ID
        /// </summary>
        /// <param name="MajorName"></param>
        /// <returns></returns>
        public int FindMajorId(string MajorName)
        {
            int majorId = 0;
            try
            {
                List<SqlParameter> args = new List<SqlParameter>();
                var name = new SqlParameter("@MajorName", SqlDbType.NVarChar);
                name.Value = MajorName;
                args.Add(name);
                majorId = (int)SqlHelper.ExecuteScalarProc("FindMajorId", args.ToArray());
            }
            catch (Exception)
            {
                
                throw;
            }
            
            return majorId;
        }



        /// <summary>
        /// 查询指定年份毕业的班级
        /// </summary>
        /// <param name="graduateYear"></param>
        /// <returns></returns>
        public List<string> ListClassName(int graduateYear)
        {
            const string sqltext = @"select ClassName from classes where GraduateYear=@Year";
            var parameters=new List<SqlParameter>();
            var year= new SqlParameter("@Year",SqlDbType.Int);
            year.Value = graduateYear;
            parameters.Add(year);
            var dt = SqlHelper.ExecuteDataTable(sqltext, parameters.ToArray());
            return (from DataRow dr in dt.Rows select dr[0].ToString()).ToList();

        }


        /// <summary>
        /// 添加一个新班级到数据库
        /// </summary>
        /// <param name="className"></param>
        /// <returns></returns>
        public bool AddClass(string className)
        {
            bool res;
            Classes classes=new Classes();
            classes.className = className;
            DbOperation.Save(classes, "classes", out res);
            return res;
        }


        /// <summary>
        /// 删除指定班名的班级
        /// </summary>
        /// <param name="className"></param>
        /// <returns></returns>
        public bool DeleteClass(string className)
        {
            string sql = @"delete classes where ClassName = @name";
            SqlParameter nameParameter=new SqlParameter("@name",SqlDbType.NVarChar);
            nameParameter.Value = className;
            int affectLine = SqlHelper.ExecuteNonquery(sql, new SqlParameter[] {nameParameter});
            return affectLine > 0 ? true : false;
        }



        /// <summary>
        /// 根据班级名称查询班级ID
        /// </summary>
        /// <param name="className"></param>
        /// <returns></returns>
        public int QueryClassId(string className)
        {
            string sql = @"select ClassID from classes where ClassName=@classname";
            SqlParameter classNameSqlParameter=new SqlParameter("@classname", SqlDbType.NVarChar);
            classNameSqlParameter.Value = className;
            Object res = SqlHelper.ExecuteScalar(sql, new SqlParameter[] {classNameSqlParameter});
            return Convert.ToInt32(res);
        }


        /// <summary>
        /// 修改班级信息,参数classes的classId属性与className属性中至少要有一个不为空,
        /// 该方法根据classId属性修改班级信息,
        /// 如果不知道classId属性则会先根据className属性查询得到结果后后再修改班级信息
        /// </summary>
        /// <param name="classes"></param>
        /// <returns>修改班级信息的结果</returns>
        public bool UpdateClassInfo(Classes classes)
        {
            if (classes.classId==0&&!classes.className.IsEmpty())
            {
                classes.classId = QueryClassId(classes.className);
            }
            return DbOperation.Update(classes, "classes");
        }
    }
}