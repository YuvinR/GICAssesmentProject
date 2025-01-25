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
            var employees = await _repository.GetAllAsync();
            var latestEmployee = employees.OrderByDescending(e => e.Id).FirstOrDefault();
            int newIdNumber = 1;

            if (latestEmployee != null && latestEmployee.Id.StartsWith("UI"))
            {
                var latestIdNumber = int.Parse(latestEmployee.Id.Substring(2));
                newIdNumber = latestIdNumber + 1;
            }

            request.EmployeeData.Id = $"UI{newIdNumber:D7}";

            await _repository.AddAsync(request.EmployeeData);
            return request.EmployeeData.Id;
        }
    }
}
