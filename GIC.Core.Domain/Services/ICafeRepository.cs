using GIC.Core.Domain.Entities;
using GIC.Core.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace GIC.Core.Domain.Services
{
    public interface ICafeRepository
    {
        Task<List<Cafe>> GetAllAsync();
        Task AddAsync(Cafe cafe);
        Task<List<CafeModel>> GetByLocationAsync(string? location);
        Task PutAsync(Cafe cafe);
        Task DeleteAsync(Guid id);
    }
}
