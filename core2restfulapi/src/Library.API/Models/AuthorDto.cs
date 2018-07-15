using System;

namespace Library.API.Models
{
    // return data model
    public class AuthorDto
    {
        // guid type assigns unique identifying number to database object
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Genre { get; set; }
    }
}
