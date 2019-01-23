using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Models
{
    public abstract class BookForManipulationDto
    {
        [Required(ErrorMessage = "You should fill out a title.")] // each validator like required has a default message assigned to it. But you can overwrite them as shown here.
        [MaxLength(100)]
        public string Title { get; set; }
        [MaxLength(500)]
        public virtual string Description { get; set; } // virtual allows overwriting. Things that implement this class will have an override in the base class, if you want to overwrite it for different scenarios.
    }
}
