using BackEndAutoCenterVw.HttpClientBasic;
using BackEndAutoCenterVw.Middlewares;
using Contracts;
using Domain.Auth;
using Domain.HttpClent;
using Domain.MailSettings;
using Domain.Models.CarEquipment;
using Domain.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Persistence;
using Persistence.AutoMapper;
using Persistence.Repositories;
using Services;
using Services.Abstractions;
using System.Reflection;
using System.Threading.Tasks;

namespace BackEndAutoCenterVw
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private static async Task<AsyncRepositoryCarEquipmentForm> InitializeCosmosClientRepositoryCarEquipmentFormInstanceAsync(
            IConfigurationSection configurationSection
            )
        {
            string databaseName = configurationSection.GetSection("DatabaseName").Value;
            string containerName = configurationSection.GetSection("ContainerCarEquipmentForm").Value;
            string account = configurationSection.GetSection("Account").Value;
            string key = configurationSection.GetSection("Key").Value;
            Microsoft.Azure.Cosmos.CosmosClient client = new(account, key);
            AsyncRepositoryCarEquipmentForm asyncRepositoryCarEquipmentForm = new(
                client,
                databaseName,
                containerName
                );
            Microsoft.Azure.Cosmos.DatabaseResponse database =
                await client.CreateDatabaseIfNotExistsAsync(databaseName);
            await database.Database.CreateContainerIfNotExistsAsync(containerName, "/id");
            return asyncRepositoryCarEquipmentForm;
        }

        private static async Task<AsyncRepositoryCarEquipment> InitializeCosmosClientRepositoryCarEquipmentInstanceAsync(
            IConfigurationSection configurationSection
            )
        {
            string databaseName = configurationSection.GetSection("DatabaseName").Value;
            string containerName = configurationSection.GetSection("ContainerCarEquipment").Value;
            string account = configurationSection.GetSection("Account").Value;
            string key = configurationSection.GetSection("Key").Value;
            Microsoft.Azure.Cosmos.CosmosClient client = new(account, key);
            AsyncRepositoryCarEquipment asyncRepositoryCarEquipmentForm = new(
                client,
                databaseName,
                containerName
                );
            Microsoft.Azure.Cosmos.DatabaseResponse database =
                await client.CreateDatabaseIfNotExistsAsync(databaseName);
            await database.Database.CreateContainerIfNotExistsAsync(containerName, "/id");
            return asyncRepositoryCarEquipmentForm;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                     .AddJwtBearer(options =>
                     {
                         options.RequireHttpsMetadata = false;
                         options.TokenValidationParameters = new TokenValidationParameters
                         {
                             ValidateIssuer = true,
                             ValidIssuer = AuthOptions.ISSUER,
                             ValidateAudience = true,
                             ValidAudience = AuthOptions.AUDIENCE,
                             ValidateLifetime = true,
                             IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                             ValidateIssuerSigningKey = true,
                         };
                     });
            var assembly = Assembly.Load("Presentation");
            var externalController = new AssemblyPart(assembly);
            services.AddAutoMapper(typeof(MappingProfile));
            services.AddControllers()
                    .ConfigureApplicationPartManager(apm =>
                    {
                        apm.ApplicationParts.Add(externalController);
                    });
            string connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<RepositoryDbContext>(options =>
                options.UseSqlServer(connection));

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BackEndAutoCenterVw", Version = "v1" });
            });
            services.AddScoped<IServiceManager, ServiceManager>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddSingleton<IAsyncRepositoryCarEquipmentForm<CarEquipmentForm>>
                (InitializeCosmosClientRepositoryCarEquipmentFormInstanceAsync(
                    Configuration.GetSection("CosmosDb")).GetAwaiter().GetResult()
                    );
            services.AddScoped<
                IAsyncServiceCarEquipmentForm<CarEquipmentForm>,
                AsyncServiceCarEquipmentForm>
                ();
            services.AddSingleton<IAsyncRepositoryCarEquipment<CarEquipment>>
               (InitializeCosmosClientRepositoryCarEquipmentInstanceAsync(
                   Configuration.GetSection("CosmosDb")).GetAwaiter().GetResult()
                   );
            services.AddScoped<
                IAsyncServiceCarEquipment<CarEquipment>,
                AsyncServiceCarEquipment>
                ();
            services.Configure<MailSetting>(Configuration.GetSection("MailSettings"));
            services.AddScoped<IAsynHttpClient<PayDataDto>, AsyncHttpClientBasic>(
                x => new(Configuration.GetSection("CheckPayService").Value));
            services.AddTransient<ExceptionHandlingMiddleware>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {



            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BackEndAutoCenterVw v1"));
            }
            app.UseMiddleware<ExceptionHandlingMiddleware>();
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(
             options => options.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()
             );
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
