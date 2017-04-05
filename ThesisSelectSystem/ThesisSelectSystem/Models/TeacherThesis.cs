using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ThesisSelectSystem.Models
{
    public class TeacherThesis
    {
        public long id { get; set; }
        public string title { get; set; }
        public string type { get; set; }
        public string maker { get; set; }
        public int currentChoosedNumber { get; set; }
        public int maxChoosedNumber { get; set; }
    }
}