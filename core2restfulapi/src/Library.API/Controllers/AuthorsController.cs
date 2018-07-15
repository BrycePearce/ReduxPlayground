using AutoMapper;
using Library.API.Helpers;
using Library.API.Models;
using Library.API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Library.API.Controllers
{
    [Route("api/authors")]
    public class AuthorsController : Controller
    {
        private ILibraryRepository _libraryRepository;
        // constructor injection to get an instance of our repository
        public AuthorsController(ILibraryRepository libraryRepository)
        {
            _libraryRepository = libraryRepository;
        }

        [HttpGet()]
        public IActionResult GetAuthors()
        {
            // get the authors
            var authorsFromRepo = _libraryRepository.GetAuthors();

            // use AutoMapper to Map the authors response to our data model. (Note IEnumerable operates here like a forEach of authors)
            var authors = Mapper.Map<IEnumerable<AuthorDto>>(authorsFromRepo);

            // serialize authors to JSON *note: JsonResult formats the given object to json
            return new JsonResult(authors);
        }
    }
}
