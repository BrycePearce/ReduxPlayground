using System;
using System.Collections.Generic;

namespace Library.API.Models
{
    public class AuthorForCreationDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTimeOffset DateOfBirth { get; set; }
        public string Genre { get; set; }

        // for creating an author with or without books. Rather than posting them 1-by-1.
        public ICollection<BookForCreationDto> Books { get; set; } = new List<BookForCreationDto>();
    }
}
