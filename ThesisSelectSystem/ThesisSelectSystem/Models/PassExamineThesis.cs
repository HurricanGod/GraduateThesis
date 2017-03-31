using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ThesisSelectSystem.Models
{
    public class PassExamineThesis
    {
        public long thesis_no { get; set; }
        public string maker_name { get; set; }
        public string sources { get; set; } 
        public string thesis_status { get; set; }
        public string thesis_name { get; set; }
        public int usingyear { get; set; }

    }
}