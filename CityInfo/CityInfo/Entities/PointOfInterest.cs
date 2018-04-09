using CityInfo.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CityInfo.Entities
{
    public class PointOfInterest
    {
        [Key] // id is automatically set as primary key by convention. But we set it as [key] anyway, to be sure.
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // a new key will be generated when a city is added.
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [ForeignKey("CityId")]
        public City city { get; set; }
        public int CityId { get; set; }
        // best practice: initialize to an empty collection (to avoid null reference exceptions)
        public ICollection<PointOfInterestDto> PointsOfInterest { get; set; }
        = new List<PointOfInterestDto>();
    }
}
