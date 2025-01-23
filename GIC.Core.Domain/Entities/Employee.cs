using GIC.Core.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GIC.Core.Domain.Entities
{
    public class Employee
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email {  get; set; }
        public string Phone { get; set; }
        public Gender Gender { get; set; }
        public DateTime StartDate { get; set; }
        public Guid? Cid { get; set; }
    }
}
