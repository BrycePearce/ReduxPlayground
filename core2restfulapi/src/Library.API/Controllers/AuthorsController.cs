using Library.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Library.API.Controllers
{
    public class AuthorsController : Controller
    {
        private ILibraryRepository _libraryRepository;
        // constructor injection to get an instance of our repository
        public AuthorsController(ILibraryRepository libraryRepository)
        {
            _libraryRepository = libraryRepository;
        }
        public IActionResult GetAuthors()
        {
            var authorsFromRepo = _libraryRepository.GetAuthors();

            // serialize authors to JSON, JsonResult formats given object to json
            return new JsonResult(authorsFromRepo);
        }
    }
}
