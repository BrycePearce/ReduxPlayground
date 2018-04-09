using CityInfo.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
// this is similar to CityDTO model file, but we are going to use it for entity framework core instead of using hardcoded data.
namespace CityInfo.Entities {
    public class City {
        [Key] // id is automatically set as primary key by convention. But we set it as [key] anyway, to be sure.
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // makes an auto-incremented column when new things are added.

        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(200)]
        public string Description { get; set; }

        // best practice: initialize to an empty collection (to avoid null reference exceptions)
        public ICollection<PointOfInterestDto> PointsOfInterest { get; set; }
        = new List<PointOfInterestDto>();
    }
}
