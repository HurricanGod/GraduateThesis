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
    public class Thesis
    {
        public int topicId { get; set; }
        public string topicTitle { get; set; }
        public string topicContext { get; set; }
        public string topicSources { get; set; }
        public string topicMakerId { get; set; }
        public string topicStatus { get; set; }
        public int maxOptionalNumber { get; set; }
        public int currentChoosedNumber { get; set; }
        public string topicType { get; set; }
        public int usingYear { get; set; }
        public string guideTeacherId { get; set; }
        public int isChoice { get; set; }

        public Thesis()
        {
            usingYear = DateTime.Now.Year;
            topicStatus = "待审核";
        }
    }
}
