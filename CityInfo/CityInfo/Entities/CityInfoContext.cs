using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityInfo.Entities
{
    public class CityInfoContext : DbContext
    {
        // If database exists, do nothing. If it doesn't, it will create it.
        public CityInfoContext(DbContextOptions<CityInfoContext> options) : base(options) {
            Database.EnsureCreated();
        }

        // essentially the model
        public DbSet<City> Cities { get; set; }
        public DbSet<PointOfInterest> PointsOfInterest  { get; set; }
    }
}
