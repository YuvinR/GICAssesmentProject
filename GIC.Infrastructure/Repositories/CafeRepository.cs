using GIC.Core.Domain.Entities;
using GIC.Core.Domain.Models;
using GIC.Core.Domain.Services;
using GIC.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GIC.Infrastructure.Repositories
{
    public class CafeRepository : ICafeRepository
    {
        private readonly DBContext _context;

        public CafeRepository(DBContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Cafe cafe)
        {
            _context.Cafe.Add(cafe);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Cafe>> GetAllAsync()
        {
            return await _context.Cafe.ToListAsync();
        }

        public async Task<List<CafeModel>> GetByLocationAsync(string? location = null)
        {
            var sql = @"
                        SELECT 
                        C.Id,C.Description,C.Location,C.Logo,C.Name,
                        Count(EE.Id) as EmployeeCount 
                        FROM dbo.Cafe as C
                        LEFT JOIN dbo.Employee as EE on EE.Cid = C.Id
                        WHERE C.Location = COALESCE(@loc, C.Location)
                        GROUP BY C.Id,C.Description,C.Location,C.Logo,C.Name
                        ORDER BY EmployeeCount DESC
                        ";

            var parameters = new[] { new Microsoft.Data.SqlClient.SqlParameter("@loc", location ?? (object)DBNull.Value) };

            var result = await _context.Database.SqlQueryRaw<CafeModel>(sql, parameters).ToListAsync();
            return result;

        }

        public async Task PutAsync(Cafe cafe)
        {
            _context.Cafe.Update(cafe);
            await _context.SaveChangesAsync();
        }
    }
}
