using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GIC.Core.Application.Features.Employee.Queries
{
    public class GetEmployeeQuery : IRequest<IEnumerable<Domain.Entities.Employee>>
    {
    }
}
