using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capi.data;
using Capi.Models;
using Microsoft.AspNetCore.Mvc;

namespace Capi.Controllers
{
    public class PersonController : Controller
    {
        // declare _context as type CrudContext
        private readonly CrudContext _context;

        // Constructor that is passed the list of people as context
        public PersonController(CrudContext context) {
            _context = context;
        }
        // return a view with the list of people, looks for the Index.cshtml in the Person views folder
        public IActionResult Index()
        {
            // ToList() converts array to IEnumerable list
            return View(_context.People.ToList());
        }

        // Logic for loading the Details page
        public IActionResult Details(int? id) {
            if (id == null) {
                // automatically generated notfound page
                return NotFound();
            }
            Person person = _context.People.SingleOrDefault(x => x.ID == id);
            if (person == null) {
                return NotFound();
            }
            return View(person);
        }

        // Logic for loading the Details page
        public IActionResult Edit(int? id) {
            if (id == null) {
                return NotFound();
            }
            Person person = _context.People.SingleOrDefault(x => x.ID == id);
            if (person == null) {
                return NotFound();
            }
            return View(person);
        }
    }
}