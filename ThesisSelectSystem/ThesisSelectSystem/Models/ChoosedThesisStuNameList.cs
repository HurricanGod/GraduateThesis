using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ThesisSelectSystem.Models
{
    public class ChoosedThesisStuNameList
    {
        public string sno { get; set; }
        public string name { get; set; }
        public long thesis_id { get; set; }
        public string thesis_name { get; set; }
        public string guider_id { get; set; }
    }
}