using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Models
{
    public class BookForCreationDto
    {
        [Required(ErrorMessage = "You should fill out a title.")] // each validator like required has a default message assigned to it. But you can overwrite them as shown here.
        [MaxLength(100)]
        public string Title { get; set; }
        [MaxLength(500)]
        public string Description { get; set; }
    }
}
