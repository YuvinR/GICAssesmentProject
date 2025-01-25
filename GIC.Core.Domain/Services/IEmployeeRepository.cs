using GIC.Core.Domain.Entities;
using GIC.Core.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GIC.Core.Domain.Services
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllAsync();
        Task<List<EmployeeCafeModel>> GetByCafeAsync(Guid cafeId);
        Task AddAsync(Employee employee);
        Task<bool> PutAsync(Employee employee);
        Task DeleteAsync(string id);
    }
}
