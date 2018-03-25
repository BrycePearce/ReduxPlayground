using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CityInfo.Controllers {
    [Route("api/cities")]
    public class CitiesController : Controller {
        // return a list of all available cities when GET "api/cities" is requested 
        [HttpGet("api/cities")]
        public IActionResult GetCities() {
            return Ok(CitiesDataStore.Current.Cities);
        }

        // return a single city (don't need api/cities/{id}, since api/cities is already part of the get route)
        // id will be automatically set from the URI
        [HttpGet("{id}")]
        public IActionResult GetCity(int id) {

            // find city
            // firstordefault() will not return an exception if {id} is not provided, it will return null or the default value. first() will throw an exception.
            /*
             * If you returned CitiesDataStore.Current.Cities[id] here, it would be accessing it in the context of an array. E.g., GET an id of 1, and it would return and item with an id of 2
             * Wheras, by using FirstOrDefault and the lamba expression is querying the data itself. E.g., GET and id of 1, and it would return the id of 1
             * note: c here is populated by C# magic
             */
            var cityToReturn = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == id);

            if (cityToReturn == null) {
                return NotFound();
            }

            return Ok(cityToReturn);

        }
    }
}
