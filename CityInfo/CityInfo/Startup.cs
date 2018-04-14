using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CityInfo.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CityInfo
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(); // adds CRUD operations context to your project

            // add DB context for entity framework core local database
            var connectionString = @"Server=(localdb)\mssqllocaldb;Database=CityInfoDB;Trusted_Connection=True;";
            services.AddDbContext<CityInfoContext>(o => o.UseSqlServer(connectionString));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }
            else {
                app.UseExceptionHandler();
            }
            // if you go to a route that doesn't exist, it will return something like 404 not found on the webpage.
            app.UseStatusCodePages();

            app.UseMvc(); // http://blog.2mas.xyz/asp-net-5-adding-mvc-to-an-application/

            //app.Run(async (context) => {
            //    await context.Response.WriteAsync("Hello World!");
            //});
        }
    }
}
