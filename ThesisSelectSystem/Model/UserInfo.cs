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
    public class UserInfo
    {
        public string account { get; set; }
        public string passwords { get; set; }
        public string salt { get; set; }
        public string roles { get; set; }
    }
}
