using CityInfo.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityInfo.Controllers {
    [Route("api/cities")]
    public class PointsOfInterestController : Controller {
        [HttpGet("{cityId}/pointsofinterest")]
        public IActionResult GetPointsOfInterest(int cityId) {
            // try and find the city
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);

            if (city == null) {
                return NotFound();
            }
            return Ok(city.PointsOfInterest);
        }

        [HttpGet("{cityId}/pointsofinterest/{id}", Name = "GetPointOfInterest")]
        public IActionResult GetPointOfInterest(int cityId, int id) {
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);

            if (city == null) {
                return NotFound();
            }

            var pointOfInterest = city.PointsOfInterest.FirstOrDefault(p => p.Id == id);

            if (pointOfInterest == null) {
                return NotFound();
            }

            return Ok(pointOfInterest);
        }
        // add a new point of interest for a city
        [HttpPost("{cityId}/pointsofinterest")]
        public IActionResult CreatPointOfInterest(int cityId,
            [FromBody] PointOfInterestForCreationDto pointOfInterest) {
            // Error: Bad request
            if (pointOfInterest == null) {
                return BadRequest();
            }
            // if description and name are the same, return an error
            if (pointOfInterest.Description == pointOfInterest.Name) {
                ModelState.AddModelError("Description", "The provided description should be different from the name.");
            }
            // make sure the request is valid according to our 'PointOfInterestForCreationDto' [required] blocks
            // it will also check to see if ModelState is set to invalid inside of this function, e.g., ModelState.AddModelError
            if (!ModelState.IsValid) {
                return BadRequest(ModelState); // ModelState tells you the specifically what is wrong, in the response for the request. For customized error handling + default
            }
            // ---
            // Error: Trying to add a point of interest to a city that does not exist
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);

            if (city == null) {
                return NotFound();
            }
            // ---
            // Bad Practice, will be improved: Calculate the number of cities we have by looping through all of them and finding the one with the highest Id
            var maxPointOfInterestId = CitiesDataStore.Current.Cities.SelectMany(
                c => c.PointsOfInterest).Max(p => p.Id);

            // Create the new point of interest object
            var finalPointOfInterest = new PointOfInterestDto() {
                Id = ++maxPointOfInterestId, // add one more to the current value, which we will use for the new point of interest
                Name = pointOfInterest.Name,
                Description = pointOfInterest.Description
            };

            // add the new point of interest
            city.PointsOfInterest.Add(finalPointOfInterest);

            // return our status code CreatedAtRoute which requires route(city) value, and the created object value (finalPointOfInterest)
            // note: getpoint ofinterest refers to the id that was sent in the GET route
            return CreatedAtRoute("GetPointOfInterest", new { cityId = cityId, id = finalPointOfInterest.Id }, finalPointOfInterest);
        }
        [HttpPut("{cityId}/pointsofinterest/{id}")]
        public IActionResult UpdatePointOfInterest(int cityId, int id,
            [FromBody] PointOfInterestDto pointOfInterest) // get content of the request
        {
            if (pointOfInterest == null) {
                return BadRequest();
            }
            if (pointOfInterest.Description == pointOfInterest.Name) {
                ModelState.AddModelError("Description", "The provided description should be different from the name.");
            }
            if (!ModelState.IsValid) {
                return BadRequest(ModelState); // ModelState tells you the specifically what is wrong in the response for the request. For customized error handling + default
            }
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId); // find a city id that matches a city id in our database store

            if (city == null) {
                return NotFound();
            }

            var pointOfInterestFromStore = city.PointsOfInterest.FirstOrDefault(p => p.Id == id); // find a POI id that matches a POI id in our database store

            if (pointOfInterestFromStore == null) {
                return NotFound();
            }

            // Update all fields
            pointOfInterestFromStore.Name = pointOfInterest.Name;
            pointOfInterestFromStore.Description = pointOfInterest.Description;

            // respond with 204 (no content) on success, 200 is also fine
            return NoContent();
        }
    }
}
