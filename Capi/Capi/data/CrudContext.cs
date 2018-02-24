using Capi.Models; // import for Person context
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// this file gets passed around, for example to DbInitializer and Startup.cs
namespace Capi.data
{
    // extend DbContext, form entityframeworkcore. DbContext is the primary class that is responsible for interacting with the database.
    public class CrudContext : DbContext
    {
        // Constructor
        public CrudContext(DbContextOptions<CrudContext> options): base(options) {
        }
        // tells Entity Framework to make a table based on the Person class
        public DbSet<Person> People { get; set; }
    }
}
