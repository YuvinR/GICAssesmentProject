using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GIC.Core.Domain.Entities
{
    public class Cafe
    {
        public Guid Id { get; set; }
        public string? Logo { get; set; }
        public string Location { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
