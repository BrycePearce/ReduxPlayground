using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capi.data;
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
        // return a view with the list of people
        public IActionResult Index()
        {
            return View(_context.People.ToList());
        }
    }
}