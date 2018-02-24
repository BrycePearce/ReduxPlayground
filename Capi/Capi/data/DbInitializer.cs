using Capi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capi.data {
    public class DbInitializer {
        // Bring in our CrudContext where we define 'People'
        public static void Initialize(CrudContext context) {
            context.Database.EnsureCreated(); // will create a database if it doesn't exist

            // check if the People table already exists
            if (context.People.Any()) {
                return;
            }
            // If no table exists, we make one
            var people = new Person[] {
            new Person { FirstName = "coolguy", LastName = "Mckenzie", Email = "cguyenzie@gmail.com", Age = 32, Subscribed = true},
            new Person { FirstName = "Bob", LastName = "Burgerman", Email = "bb@gmail.com", Age = 33, Subscribed = true},
            new Person { FirstName = "Helter", LastName = "Skelter", Email = "MMansion@gmail.com", Age = 52, Subscribed = false}
        };
            // add the people to the table
            foreach (Person CoolGuys in people) {
                // context comes from CrudContext, use the People in there to add people directly to the table
                context.People.Add(CoolGuys);
            }
            // save the changes (need to save until the changes are committed to a real database. Until you push to remote, it only exists in your machine(in memory))
            context.SaveChanges();
        }
    }
}

