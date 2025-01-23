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
    public class UpdateCafeCommand : IRequest<Guid>
    {
        public Domain.Entities.Cafe CafeData { get; set; }
    }
    public class UpdateCafeCommandHandler : IRequestHandler<UpdateCafeCommand, Guid>
    {
        private readonly ICafeRepository _repository;

        public UpdateCafeCommandHandler(ICafeRepository repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(UpdateCafeCommand request, CancellationToken cancellationToken)
        {
            await _repository.PutAsync(request.CafeData);
            return request.CafeData.Id;
        }
    }
}
