using GIC.Core.Domain.Entities;
using GIC.Core.Domain.Models;
using GIC.Core.Domain.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GIC.Core.Application.Features.Employee.Queries
{
 
    public class CreateEmployeeByCafeQuery : IRequest<List<EmployeeCafeModel>>
    {
        public Guid CafeId { get; set; }
    }
    public class GetEmployeeByCafeQueryHandler : IRequestHandler<CreateEmployeeByCafeQuery, List<EmployeeCafeModel>>
    {

        private readonly IEmployeeRepository _repository;

        public GetEmployeeByCafeQueryHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<EmployeeCafeModel>> Handle(CreateEmployeeByCafeQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetByCafeAsync(request.CafeId);
        }
    }
}
