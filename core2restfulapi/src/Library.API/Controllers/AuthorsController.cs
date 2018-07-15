using AutoMapper;
using Library.API.Models;
using Library.API.Services;
using Microsoft.AspNetCore.Mvc;
using System;
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
            return Ok(authors);
        }

        [HttpGet("{id}")]
        public IActionResult GetAuthor(Guid id)
        {
            // call to get author
            var authorFromRepo = _libraryRepository.GetAuthor(id);

            if (authorFromRepo == null) {
                return NotFound();
            }

            // use auto mapper to map given author type to our single Author Dto type
            var author = Mapper.Map<AuthorDto>(authorFromRepo);

            return Ok(author);
        }
    }
}
