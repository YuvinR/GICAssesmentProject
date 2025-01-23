using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using GIC.Core.Domain.Services;
using GIC.Infrastructure.Data;
using GIC.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.Extensions.Configuration;

namespace GIC.Infrastructure
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DBContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<ICafeRepository, CafeRepository>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();

            return services;
        }
        
    }
}
