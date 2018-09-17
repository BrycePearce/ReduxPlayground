using AutoMapper;
using Library.API.Models;
using Library.API.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Library.API.Controllers
{
    [Route("api/authors/{authorId}/books")]
    public class BooksController : Controller
    {
        private ILibraryRepository _libraryRepository;

        public BooksController(ILibraryRepository libraryRepository)
        {
            _libraryRepository = libraryRepository;
        }

        [HttpGet()]
        public IActionResult GetBooksForAuthor(Guid authorId)
        {
            // check if the author exists
            if (!_libraryRepository.AuthorExists(authorId))
            {
                return NotFound();
            }

            // retrieve the books from the author
            var booksFromAuthorFromRepo = _libraryRepository.GetBooksForAuthor(authorId);

            // map the response to our BookDto model (note: IEnumberable is like a foreach book)
            var booksForAuthor = Mapper.Map<IEnumerable<BookDto>>(booksFromAuthorFromRepo);

            return Ok(booksForAuthor);
        }

        [HttpGet("{id}")]
        public IActionResult GetBookForAuthor(Guid authorId, Guid id)
        {
            // check if the author exists
            if (!_libraryRepository.AuthorExists(authorId))
            {
                return NotFound();
            }

            // retrieve book from author
            var bookForAuthorFromRepo = _libraryRepository.GetBookForAuthor(authorId, id);

            // check if the book exists
            if (bookForAuthorFromRepo == null)
            {
                return NotFound();
            }

            // map the response to our BookDto model
            var bookForAuthor = Mapper.Map<BookDto>(bookForAuthorFromRepo);

            return Ok(bookForAuthor);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBookForAuthor(Guid authorId, Guid id)
        {
            // check if the author exists
            if (!_libraryRepository.AuthorExists(authorId))
            {
                return NotFound();
            }

            // fetch book from author
            var bookForAuthorFromRepo = _libraryRepository.GetBookForAuthor(authorId, id);

            // if we cannot find the book to be deleted, return not found
            if (bookForAuthorFromRepo == null)
            {
                return NotFound();
            }

            // Delete the book
            _libraryRepository.DeleteBook(bookForAuthorFromRepo);

            // Save
            if (!_libraryRepository.Save())
            {
                throw new Exception($"Deleting book {id} for author {authorId} failed on save.");
            }

            // Success
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBookForAuthor(Guid authorId, Guid id, [FromBody] BookForUpdateDto book)
        {
            if (book == null)
            {
                return BadRequest();
            }

            // check if the author exists
            if (!_libraryRepository.AuthorExists(authorId))
            {
                return NotFound();
            }

            // fetch book from author
            var bookForAuthorFromRepo = _libraryRepository.GetBookForAuthor(authorId, id);

            // if we cannot find the book to be deleted, return not found
            if (bookForAuthorFromRepo == null)
            {
                return NotFound();
            }

            // Auto mapper maps to bookForUpdateDto format
            // then Applies Updated field values
            // then it maps updated values back to entity (book is source object, bookForAuthorFromRepo is destination object)
            Mapper.Map(book, bookForAuthorFromRepo); // (saves updated values in bookforAuthorFromRepo)

            // now the author should have the updated field values, so we can call to update it.
            _libraryRepository.UpdateBookForAuthor(bookForAuthorFromRepo);

            if (!_libraryRepository.Save())
            {
                throw new Exception($"Updating book {id} for author {authorId} failed on save.");
            }

            // Success, 204 no-content
            return NoContent();
        }
    }
}
