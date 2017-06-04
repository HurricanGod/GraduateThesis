using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ThesisSelectSystem.Models
{
    public class PersonalThesis
    {
        public long thesisId { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string content { get; set; }
        public string response { get; set; }


        public PersonalThesis()
        {
            
        }

        public PersonalThesis(long Id, string Name, string Type, string Content, string ResponsibleForSection)
        {
            this.thesisId = Id;
            this.name = Name;
            this.type = Type;
            this.content = Content;
            this.response = ResponsibleForSection;
        }
    }
}