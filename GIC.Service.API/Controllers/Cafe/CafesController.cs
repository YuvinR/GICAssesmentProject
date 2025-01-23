using GIC.Core.Application.Features.Cafe.Commands;
using GIC.Core.Application.Features.Cafe.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GIC.Service.API.Controllers.Cafe
{
    [ApiController]
    [Route("api/cafe")]
    public class CafesController :ControllerBase
    {
        private readonly IMediator _mediator;

        public CafesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route("location")]
        public async Task<IActionResult> GetByLocation(string? location =null)
        {
            CreateCafeQuery createCafeQuery = new CreateCafeQuery
            {
                Location = location
            };
            var products = await _mediator.Send(createCafeQuery);
            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCafeCommand command)
        {
            var id = await _mediator.Send(command);
            return Ok(id);
        }

        [HttpPut]
        public async Task<IActionResult> Put(UpdateCafeCommand command)
        {
            var id = await _mediator.Send(command);
            return Ok(id);
        }
    }
}

