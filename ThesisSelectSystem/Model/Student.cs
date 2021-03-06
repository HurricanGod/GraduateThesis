﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    /// <summary>
    /// 类的字段声明顺序必须与数据库表字段的顺序一一对应
    /// </summary>
    public class Student
    {
        public string sno { get; set; }
        public int majorid { get; set; }
        public string sex { get; set; }
        public string shortTel { get; set; }
        public string longTel { get; set; }
        public int classid { get; set; }
        public string sname { get; set; }
        public string email { get; set; }
        public string position { get; set; }
        public int graduateYear { get; set; }
        public string whetherMakeTopic { get; set; }
        public string guiderId { get; set; }
        public string guiderOpinion { get; set; }

        public Student()
        {
        }

        public Student(string Sno, string Sname, int Classid, int Majorid, string ShortTel,
            string LongTel, string Email = "",  string Position = "非班干",
            string WhetherMakeTopic = "否", string GuiderId = "", string Guideropinion = "不同意")
        {
            this.sno = Sno;
            this.email = Email;
            this.sname = Sname;
            this.classid = Classid;
            this.majorid = Majorid;
            this.shortTel = ShortTel;
            this.longTel = LongTel;
            this.guiderId = GuiderId;
            this.position = Position;
            this.whetherMakeTopic = WhetherMakeTopic;
            this.graduateYear = DateTime.Now.Year;
            this.guiderOpinion = Guideropinion;
        }

        
    }
}
