using CityInfo.Models; // import our Model of CityDto so we can create mock data based off of it
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityInfo {
    public class CitiesDataStore {
        // returns an instance of CitiesDataStore, allows us to keep working on the same data. Also initializes the property in its declaration.
        // using this, we can access our current cities by doing CitiesDataStore.Current.Cities
        // Without this, can't seem to access the data
        public static CitiesDataStore Current { get; } = new CitiesDataStore();

        // Initialize a list to get/set our Cities data
        public List<CityDto> Cities { get; set; }

        public CitiesDataStore() {
            // Initialize dummy data
            Cities = new List<CityDto>() {

                new CityDto() {
                Id = 1,
                Name = "New York City",
                Description = "The one with that big park."
                },
                new CityDto() {
                Id = 2,
                Name = "Antwerp",
                Description = "The one with the cathedral that was never finished."
                },
                new CityDto() {
                Id = 3,
                Name = "Paris",
                Description = "The one with that big tower."
                },
            };
        }
    }
}
