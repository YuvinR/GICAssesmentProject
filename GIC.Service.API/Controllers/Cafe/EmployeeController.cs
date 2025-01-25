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

        [HttpPost]
        public async Task<IActionResult> Create(CreateEmployeeCommand command)
        {
            if (!IsValidEmail(command.EmployeeData.Email))
            {
                return BadRequest("Invalid email format.");
            }

            var id = await _mediator.Send(command);
            return CreatedAtAction(nameof(Create), new { id }, id);
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
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
