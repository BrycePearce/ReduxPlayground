using AutoMapper;
using Library.API.Entities;
using Library.API.Helpers;
using Library.API.Models;
using Library.API.Services;
using Microsoft.AspNetCore.JsonPatch;
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

        [HttpGet("{id}", Name = "GetBookForAuthor")]
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

        [HttpPost()]
        public IActionResult CreateBookForAuthor(Guid authorId, [FromBody] BookForCreationDto book)
        {
            if (book == null)
            {
                return BadRequest();
            }

            // Add manual validator check
            if (book.Description == book.Title)
            {
                ModelState.AddModelError(nameof(BookForCreationDto), "The provided description should be different from the title."); // first param will just be the title of the error in the response
            }

            // this checks validations like required or maxlength, as defined in the models. Also checks our custom validators, like above.
            if (!ModelState.IsValid)
            {
                return new UnprocessableEntityObjectResult(ModelState); // returns something like "The Title field is required"
            }

            if (!_libraryRepository.AuthorExists(authorId))
            {
                return NotFound();
            }

            var bookEntity = Mapper.Map<Book>(book);

            _libraryRepository.AddBookForAuthor(authorId, bookEntity);

            if (!_libraryRepository.Save())
            {
                throw new Exception($"Creating a book for author {authorId} failed on save.");
            }

            var bookToReturn = Mapper.Map<BookDto>(bookEntity);

            return CreatedAtRoute("GetBookForAuthor", new { authorId = authorId, id = bookToReturn.Id }, bookToReturn);
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

            // Add manual validator check
            if (book.Description == book.Title)
            {
                ModelState.AddModelError(nameof(BookForUpdateDto), "The provided description should be different from the title."); // first param will just be the title of the error in the response
            }

            // Add manual validator check
            if (!ModelState.IsValid)
            {
                return new UnprocessableEntityObjectResult(ModelState);
            }

            // check if the author exists
            if (!_libraryRepository.AuthorExists(authorId))
            {
                return NotFound();
            }

            // fetch book from author
            var bookForAuthorFromRepo = _libraryRepository.GetBookForAuthor(authorId, id);

            // if we cannot find the book to be updated, create it
            if (bookForAuthorFromRepo == null)
            {
                var bookToAdd = Mapper.Map<Book>(book); // maps title/description from BookForUpdateDto to Book model
                bookToAdd.Id = id;
                _libraryRepository.AddBookForAuthor(authorId, bookToAdd);
                if (!_libraryRepository.Save())
                {
                    throw new Exception($"Upserting book {id} for author {authorId} failed on save.");
                }

                var bookToReturn = Mapper.Map<BookDto>(bookToAdd);

                // Created
                return CreatedAtRoute("GetBookForAuthor", // note: the first param GetBookForAuthor is in relation to [HttpGet("{id}", Name = "GetBookForAuthor")]
                    new { authorId = authorId, id = bookToReturn.Id },
                    bookToReturn);
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

        [HttpPatch("{id}")]
        public IActionResult PartiallyUpdateBookForAuthor(Guid authorId, Guid id,
            [FromBody] JsonPatchDocument<BookForUpdateDto> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            // check if the author exists
            if (!_libraryRepository.AuthorExists(authorId))
            {
                return NotFound();
            }

            // returns type Book
            var bookForAuthorFromRepo = _libraryRepository.GetBookForAuthor(authorId, id);

            if (bookForAuthorFromRepo == null)
            {
                var bookDto = new BookForUpdateDto();
                patchDoc.ApplyTo(bookDto, ModelState);

                if (bookDto.Description == bookDto.Title)
                {
                    ModelState.AddModelError(nameof(BookForUpdateDto), "The provided description should be different form the title.");
                }

                TryValidateModel(bookDto);

                if (!ModelState.IsValid)
                {
                    return new UnprocessableEntityObjectResult(ModelState);
                }

                var bookToAdd = Mapper.Map<Book>(bookDto);
                bookToAdd.Id = id;

                _libraryRepository.AddBookForAuthor(authorId, bookToAdd);

                if (!_libraryRepository.Save())
                {
                    throw new Exception($"Upserting book {id} for author {authorId} failed on save.");
                }

                var bookToReturn = Mapper.Map<BookDto>(bookToAdd);
                return CreatedAtRoute("GetBookForAuthor", new { authorId = authorId, id = bookToReturn.Id }, bookToReturn);
            }

            // map type Book to BookForUpdateDto
            var bookToPatch = Mapper.Map<BookForUpdateDto>(bookForAuthorFromRepo);

            patchDoc.ApplyTo(bookToPatch, ModelState);

            // add model error if description == title
            if (bookToPatch.Description == bookToPatch.Title)
            {
                ModelState.AddModelError(nameof(BookForUpdateDto), "The provided description should be different form the title.");
            }

            // then revalidate, which will the description == title error to the model, if necessary.
            TryValidateModel(bookToPatch);

            if (!ModelState.IsValid)
            {
                return new UnprocessableEntityObjectResult(ModelState);
            }

            // Add Validation
            Mapper.Map(bookToPatch, bookForAuthorFromRepo);

            _libraryRepository.UpdateBookForAuthor(bookForAuthorFromRepo);

            if (!_libraryRepository.Save())
            {
                throw new Exception($"Patching book {id} for author {authorId} failed on save.");
            }

            return NoContent();
        }
    }
}
