using CityInfo.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityInfo.Controllers {
    [Route("api/cities")]
    public class PointsOfInterestController : Controller {
        private ILogger<PointsOfInterestController> _logger;
        // constructor injection of (error) logger
        public PointsOfInterestController(ILogger<PointsOfInterestController> logger) {
            _logger = logger;
        }

        [HttpGet("{cityId}/pointsofinterest")]
        public IActionResult GetPointsOfInterest(int cityId) {
            try {
                // try and find the city
                var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);

                if (city == null) {
                    _logger.LogInformation($"City with id {cityId} wasn't found when accessing points of interest."); // logger for debugging purposes only
                    return NotFound();
                }
                return Ok(city.PointsOfInterest);
            }
            // handle exceptions, such as city NotFound();
            catch (Exception ex) {
                _logger.LogCritical($"Exception while getting points of interest for city with id {cityId}.", ex);
                return StatusCode(500, "A problem happened while handling your request."); // Don't give too many details on the return, since the client can see it as well.
            }
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

        // Allows user to update a city POI name/description, but requires the user to pass in both fields. Left out fields will be nulled.
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

        // PUT to update partial values
        [HttpPatch("{cityId}/pointsofinterest/{id}")]
        public IActionResult PartiallyUpdatePointOfInterest(int cityId, int id,
            [FromBody] JsonPatchDocument<PointOfInterestUpdateDto> patchDoc) { // we use PointOfInterestUpdateDto instead of PointOfInterestDto, because PointOfInterestDto has an id. And we don't want users to change id's.
            if (patchDoc == null) {
                return BadRequest();
            }

            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);
            if (city == null) {
                return NotFound();
            }

            var pointOfInterestFromStore = city.PointsOfInterest.FirstOrDefault(c => c.Id == id);
            if (pointOfInterestFromStore == null) {
                return NotFound();
            }

            var pointOfInterestToPatch =
                new PointOfInterestUpdateDto() {
                    Name = pointOfInterestFromStore.Name,
                    Description = pointOfInterestFromStore.Description
                };
            // transform pointOfInterestToPatch from point of interest recieved from data store, to type PointOfInterestUpdateDto
            patchDoc.ApplyTo(pointOfInterestToPatch, ModelState); // we pass in ModelState because it knows what values are in PointOfInterestUpdateDto. So if user passes in something other than
                                                                  // Name/Description, it will cause ModelState to be invalid.
            
            // After doing patchDoc, it may find some of the validation rules are being broken, or bad field is being sent. So make sure it is correct here.
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            // Manually apply our custom error handling rule, name cannot equal description
            if (pointOfInterestToPatch.Description == pointOfInterestToPatch.Name) {
                ModelState.AddModelError("Description", "The provided description should be different from the name.");
            }

            // Make sure the model being patched is still valid (e.g. user cannot remove name, so if user tries to patch remove it, it should throw an error)
            // e.g. tryValidateModel triggers validation of PointOfInterestUpdateDto
            TryValidateModel(pointOfInterestToPatch);

            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            // Update all fields
            pointOfInterestFromStore.Name = pointOfInterestToPatch.Name;
            pointOfInterestFromStore.Description = pointOfInterestToPatch.Description;

            // respond with 204 (no content) on success, 200 is also fine
            return NoContent();
        }
        [HttpDelete("{cityId}/pointsofinterest/{id}")]
        public IActionResult DeletePointOfInterest(int cityId, int id) {
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);
            if (city == null) {
                return NotFound();
            }

            var pointOfInterestFromStore = city.PointsOfInterest.FirstOrDefault(c => c.Id == id);
            if (pointOfInterestFromStore == null) {
                return NotFound();
            }

            city.PointsOfInterest.Remove(pointOfInterestFromStore);

            return NoContent();
        }
    }
}
