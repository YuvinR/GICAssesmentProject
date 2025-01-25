using GIC.Core.Application.Features.Cafe.Commands;
using GIC.Core.Application.Features.Cafe.Queries;
using GIC.Core.Application.Features.Employee.Commands;
using GIC.Core.Application.Features.Employee.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GIC.Service.API.Controllers.Cafe
{
    [ApiController]
    [Route("api/employees")]
    public class EmployeeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public EmployeeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        //[HttpGet]
        //public async Task<IActionResult> Get()
        //{
        //    var products = await _mediator.Send(new GetEmployeeQuery());
        //    return Ok(products);
        //}

        [HttpPost]
        public async Task<IActionResult> Create(CreateEmployeeCommand command)
        {
            var id = await _mediator.Send(command);
            return CreatedAtAction(nameof(Create), new { id }, id);
        }

        [HttpGet]
        public async Task<IActionResult> GetByLocation(Guid cafeId)
        {
            CreateEmployeeByCafeQuery createCafeQuery = new CreateEmployeeByCafeQuery
            {
                CafeId = cafeId
            };
            var cafes = await _mediator.Send(createCafeQuery);
            return Ok(cafes);
        }

        [HttpPut]
        public async Task<IActionResult> Put(UpdateEmployeeCommand command)
        {
            var id = await _mediator.Send(command);
            return CreatedAtAction(nameof(Put), new { id }, id);
        }


        [HttpDelete]
        public async Task<IActionResult> Delete(string Id)
        {
            RemoveEmployeeCommand command = new RemoveEmployeeCommand
            {
                Id = Id
            };
            await _mediator.Send(command);
            return Ok();
        }
    }

}
