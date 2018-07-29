using AutoMapper;
using Library.API.Entities;
using Library.API.Models;
using Library.API.Services;
using Microsoft.AspNetCore.Http;
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

        [HttpGet("{id}", Name = "GetAuthor")]
        public IActionResult GetAuthor(Guid id)
        {
            // call to get author
            var authorFromRepo = _libraryRepository.GetAuthor(id);

            if (authorFromRepo == null)
            {
                return NotFound();
            }

            // use auto mapper to map given author type to our single Author Dto type
            var author = Mapper.Map<AuthorDto>(authorFromRepo);

            return Ok(author);
        }

        [HttpPost]
        public IActionResult CreateAuthor([FromBody] AuthorForCreationDto author) // get the body of the POST
        {
            if (author == null)
            {
                return BadRequest();
            }

            // map the author to our Author model, which is what the AddAuthor() function accepts.
            var authorEntity = Mapper.Map<Author>(author);

            // add the author
            _libraryRepository.AddAuthor(authorEntity);

            // Save, and handle false if saving returns false.
            if (!_libraryRepository.Save())
            {
                throw new Exception("Creating an author failed on save.");
            }

            // map the author to our client contract and return it
            var authorToReturn = Mapper.Map<AuthorDto>(authorEntity);

            return CreatedAtRoute("GetAuthor", new { id = authorToReturn.Id }, authorToReturn);
        }

        [HttpPost("{id}")]
        public IActionResult BlockAuthorCreation(Guid id)
        {
            // if someone is trying to create a new author, where an author already exists. Return 409 Conflict.
            if (_libraryRepository.AuthorExists(id))
            {
                return new StatusCodeResult(StatusCodes.Status409Conflict);
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAuthor(Guid id)
        {
            var authorFromRepo = _libraryRepository.GetAuthor(id);

            if (authorFromRepo == null)
            {
                return NotFound();
            }

            _libraryRepository.DeleteAuthor(authorFromRepo);

            if (!_libraryRepository.Save())
            {
                throw new Exception($"Deleting author {id} failed on save.");
            }

            return NoContent();
        }
    }
}
