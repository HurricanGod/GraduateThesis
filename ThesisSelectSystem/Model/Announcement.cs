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
    public class Announcement
    {
        public int aid { get; set; }
        public string title { get; set; }
        public string contents { get; set; }
        public DateTime times { get; set; }
        public string status { get; set; }
        public string scope { get; set; }
    }
}
