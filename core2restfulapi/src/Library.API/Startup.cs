using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Library.API.Services;
using Library.API.Entities;
using Microsoft.EntityFrameworkCore;
using Library.API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace Library.API
{
    public class Startup
    {
        public static IConfiguration Configuration;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(setupAction => {
                // returns not acceptable if you attempt to request non JSON format, like XML. Returns 406 not acceptable.
                setupAction.ReturnHttpNotAcceptable = true;

                setupAction.OutputFormatters.Add(new XmlDataContractSerializerOutputFormatter()); // format JSON responses to XML, if XML requested in header.
                setupAction.InputFormatters.Add(new XmlDataContractSerializerInputFormatter());

            });

            // register the DbContext on the container, getting the connection string from
            // appSettings (note: use this during development; in a production environment,
            // it's better to store the connection string in an environment variable)
            var connectionString = Configuration["connectionStrings:libraryDBConnectionString"];
            services.AddDbContext<LibraryContext>(o => o.UseSqlServer(connectionString));

            // register the repository
            services.AddScoped<ILibraryRepository, LibraryRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env,
            ILoggerFactory loggerFactory, LibraryContext libraryContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // exception handler middleware
                app.UseExceptionHandler(appBuilder =>
                {
                    appBuilder.Run(async context =>
                    {
                        // global exception handler (when in prod mode)
                        context.Response.StatusCode = 500;
                        await context.Response.WriteAsync("generic 500 exception error :(:(:(");
                    });
                });
            }
            // auto-mapper
            AutoMapper.Mapper.Initialize(cfg =>
            {
                // Auto mapper for get Authors
                cfg.CreateMap<Entities.Author, Models.AuthorDto>() // mapping resource Author, to our defined Author model
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => // since we want to transform "name" to "firstname lastname", do that for this member.
                $"{src.FirstName} {src.LastName}"))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.GetCurrentAge())); // use our helper method "getCurrentAge" to transform this member

                // Auto mapper for Books
                cfg.CreateMap<Entities.Book, Models.BookDto>(); // since we have no special mapping, this statement is good enough. It will auto-map.

                // Auto Mapper for create author
                cfg.CreateMap<Models.AuthorForCreationDto, Entities.Author>();

                //
                cfg.CreateMap<Models.BookForCreationDto, Entities.Book>();

                // Auto Mapper for UpdateBookForAuthor (book -> bookForAuthorFromRepo)
                cfg.CreateMap<Models.BookForUpdateDto, Entities.Book>();

                // Auto Mapper for Book entity to BookForUpdateDTO
                cfg.CreateMap<Entities.Book, Models.BookForUpdateDto>();

            });

            libraryContext.EnsureSeedDataForContext();
            app.UseMvc();
        }
    }
}
