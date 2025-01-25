using GIC.Core.Domain.Entities;
using GIC.Core.Domain.Models;
using GIC.Core.Domain.Services;
using GIC.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GIC.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DBContext _context;

        public EmployeeRepository(DBContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Employee employee)
        {
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _context.Employee.ToListAsync();
        }

        public async Task<List<EmployeeCafeModel>> GetByCafeAsync(Guid cafeId)
        {
            var sql = @"SELECT EE.Id,EE.Name,EE.Email,EE.Phone,EE.Gender,DATEDIFF(DAY, EE.StartDate,GETDATE() ) AS DaysWorked , C.Id as CafeId,C.Name as CafeName
                        FROM dbo.Employee as EE
                        LEFT JOIN dbo.Cafe as C on C.Id = EE.Cid
                        WHERE C.Id = @cafeid
                        ORDER BY DaysWorked Desc";

            var parameters = new[] { new Microsoft.Data.SqlClient.SqlParameter("@cafeid", cafeId) };

            var result = await _context.Database.SqlQueryRaw<EmployeeCafeModel>(sql, parameters).ToListAsync();
            return result;

        }

        public async Task<bool> PutAsync(Employee employee)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var existingEmployee = await _context.Employee.FindAsync(employee.Id);
                if (existingEmployee == null)
                    throw new Exception($"Product with ID {employee.Id} not found.");

                existingEmployee.Name = employee.Name;
                existingEmployee.StartDate = employee.StartDate;
                existingEmployee.Gender = employee.Gender;
                existingEmployee.Email= employee.Email;
                existingEmployee.Phone = employee.Phone;

                _context.Employee.Update(existingEmployee);

              
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Rollback the transaction in case of any error
                await transaction.RollbackAsync();
                Console.WriteLine($"Error: {ex.Message}");
                return false; // Indicate failure
            }
        }

        public async Task DeleteAsync(string id)
        {
            var sql = @"DELETE FROM dbo.Employee WHERE Id= @id";

            var parameters = new[] { new Microsoft.Data.SqlClient.SqlParameter("@id", id) };

            await _context.Database.ExecuteSqlRawAsync(sql, parameters);

        }
    }
}
