using GIC.Core.Application.Features.Cafe.Commands;
using GIC.Core.Application.Features.Cafe.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace GIC.Service.API.Controllers.Cafe
{
    [ApiController]
    [Route("api/cafes")]
    public class CafesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CafesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetByLocation(string? location = null)
        {
            CreateCafeQuery createCafeQuery = new CreateCafeQuery
            {
                Location = location
            };
            var cafes = await _mediator.Send(createCafeQuery);
            return Ok(cafes);
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

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            RemoveCafeCommand command = new RemoveCafeCommand
            {
                Id = id
            };
            await _mediator.Send(command);
            return Ok();
        }
    }
}

