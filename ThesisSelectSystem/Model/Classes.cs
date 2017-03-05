using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    /// <summary>
    /// 类的字段声明顺序必须与数据库表字段的顺序一一对应
    /// </summary>
    public class Classes
    {
        public int classId { get; set; }
        public string className { get; set; }
        public int marjorId  { get; set; }
        public int humanNumber { get; set; }
        public int graduateYear { get; set; }
    }
}
