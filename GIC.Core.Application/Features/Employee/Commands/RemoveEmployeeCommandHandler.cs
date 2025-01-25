using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GIC.Core.Domain.Services;
using MediatR;

namespace GIC.Core.Application.Features.Employee.Commands
{

    public class RemoveEmployeeCommand : IRequest
    {
        public string Id { get; set; }
    }
    public class RemoveEmployeeCommandHandler : IRequestHandler<RemoveEmployeeCommand>
    {
        private readonly IEmployeeRepository _repository;

        public RemoveEmployeeCommandHandler(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        public async Task Handle(RemoveEmployeeCommand request, CancellationToken cancellationToken)
        {
            await _repository.DeleteAsync(request.Id);
        }
    }
}
