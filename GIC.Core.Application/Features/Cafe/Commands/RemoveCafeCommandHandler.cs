using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GIC.Core.Domain.Services;
using MediatR;

namespace GIC.Core.Application.Features.Cafe.Commands
{
    public class RemoveCafeCommand : IRequest
    {
        public Guid Id { get; set; }
    }
    public class RemoveCafeCommandHandler : IRequestHandler<RemoveCafeCommand>
    {
        private readonly ICafeRepository _repository;

        public RemoveCafeCommandHandler(ICafeRepository repository)
        {
            _repository = repository;
        }

        public async Task Handle(RemoveCafeCommand request, CancellationToken cancellationToken)
        {
            await _repository.DeleteAsync(request.Id);
        }
    }
}
