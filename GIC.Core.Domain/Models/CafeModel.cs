using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GIC.Core.Domain.Models
{
    public class CafeModel
    {
        public Guid Id { get; set; } // Assuming Id is always non-null
        public string? Description { get; set; } // Nullable
        public string? Location { get; set; } // Nullable
        public string? Logo { get; set; } // Nullable
        public string? Name { get; set; } // Nullable
        public int EmployeeCount { get; set; }
    }
}
