using GIC.Core.Application.Features.Cafe.Commands;
using GIC.Core.Domain.Entities;
using GIC.Core.Domain.Services;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CafeModel = GIC.Core.Domain.Models.CafeModel;

namespace GIC.Core.Application.Features.Cafe.Queries
{
    public class CreateCafeQuery : IRequest<List<CafeModel>>
    {
        public string? Location { get; set; }
    }
    public class GetCafesByLocationQueryHandler : IRequestHandler<CreateCafeQuery, List<CafeModel>>
    {

        private readonly ICafeRepository _repository;

        public GetCafesByLocationQueryHandler(ICafeRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<CafeModel>> Handle(CreateCafeQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetByLocationAsync(request?.Location);
        }
    }
}
