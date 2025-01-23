using GIC.Core.Domain.Entities;
using GIC.Core.Domain.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GIC.Core.Application.Features.Cafe.Commands
{
    public class CreateCafeCommand : IRequest<Guid>
    {
        public Domain.Entities.Cafe CafeData { get; set; }
    }
    public class CreateCafeCommandHandler : IRequestHandler<CreateCafeCommand, Guid>
    {
        private readonly ICafeRepository _repository;

        public CreateCafeCommandHandler(ICafeRepository repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(CreateCafeCommand request, CancellationToken cancellationToken)
        {
            request.CafeData.Id = Guid.NewGuid();
            await _repository.AddAsync(request.CafeData);
            return request.CafeData.Id;
        }
    }
}
