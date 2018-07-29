using AutoMapper;
using Library.API.Entities;
using Library.API.Helpers;
using Library.API.Models;
using Library.API.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Library.API.Controllers
{
    [Route("api/authorcollections")]
    public class AuthorCollectionsController : Controller
    {
        private ILibraryRepository _libraryRepository;

        public AuthorCollectionsController(ILibraryRepository libraryRepository)
        {
            _libraryRepository = libraryRepository;
        }

        [HttpPost]
        public IActionResult CreateAuthorCollection([FromBody] IEnumerable<AuthorForCreationDto> authorCollection) // create multiple authors at once
        {
            if (authorCollection == null)
            {
                return BadRequest();
            }

            // map each author to our author class
            var authorEntities = Mapper.Map<IEnumerable<Author>>(authorCollection);

            // add each author
            foreach (var author in authorEntities)
            {
                _libraryRepository.AddAuthor(author);
            }

            // save
            if (!_libraryRepository.Save())
            {
                throw new Exception("Creating an author collection failed on save.");
            }

            var authorCollectionToReturn = Mapper.Map<IEnumerable<AuthorDto>>(authorEntities);
            var idsAsString = string.Join(",", authorCollectionToReturn.Select(a => a.Id));

            // created at the GetAuthorCollection route with the ids (idsAsString), and authorCollectionToReturn as the response body
            // **Note: this lets you use response header to find the GUID of the created authors, allowing you to then to GET the response header and get back your created authors.
            return CreatedAtRoute("GetAuthorCollection", new { ids = idsAsString }, authorCollectionToReturn);
        }

        // get multiple authors
        [HttpGet("({ids})", Name = "GetAuthorCollection")]
        public IActionResult GetAuthorCollection(
            [ModelBinder(BinderType = typeof(ArrayModelBinder))] IEnumerable<Guid> ids)
        {
            if (ids == null)
            {
                return BadRequest();
            }

            // get the authors
            var authorEntities = _libraryRepository.GetAuthors(ids);

            // check to see if all authors have been found
            if (ids.Count() != authorEntities.Count())
            {
                return NotFound();
            }

            // map the authors to our author model
            var authorsToReturn = Mapper.Map<IEnumerable<AuthorDto>>(authorEntities);

            return Ok(authorsToReturn);
        }
    }
}
