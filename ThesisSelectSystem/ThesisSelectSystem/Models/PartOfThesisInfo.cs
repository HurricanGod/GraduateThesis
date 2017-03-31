using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ThesisSelectSystem.Models
{
    public class PartOfThesisInfo
    {
        public long thesis_id { get; set; }
        public string thesis_name { get; set; }
        public string thesis_type { get; set; }
        public string thesis_status { get; set; }
    }
}