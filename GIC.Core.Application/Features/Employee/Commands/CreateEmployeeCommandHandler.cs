using GIC.Core.Domain.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GIC.Core.Application.Features.Employee.Commands
{
    public class CreateEmployeeCommand : IRequest<string>
    {
        public Domain.Entities.Employee EmployeeData { get; set; }
    }
    public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, string>
    {
        private readonly IEmployeeRepository _repository;

        public CreateEmployeeCommandHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task<string> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
        {
            await _repository.AddAsync(request.EmployeeData);
            return request.EmployeeData.Id;
        }
    }
}
