using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GIC.Core.Domain.Models
{
    public class EmployeeCafeModel
    {
        public string Id { get; set; } 
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string Gender { get; set; }
        public int DaysWorked { get; set; }
        public Guid CafeId { get; set; }
        public string? CafeName { get; set; }
    }
}
