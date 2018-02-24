using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capi.Models {
    public class Person {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public bool Subscribed { get; set; }
    }
}
