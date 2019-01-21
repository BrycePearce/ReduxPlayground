using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.API.Helpers
{
    public class UnprocessableEntityObjectResult : ObjectResult
    {
        public UnprocessableEntityObjectResult(ModelStateDictionary modelState)
           : base(new SerializableError(modelState)) // base is base constructor. SerializableError contains model state as key:value pairs. It was made for these kind of checks.
            // that's why I don't have to do UnprocessableEntityObjectResult.SomeMethod() when calling this method
        {
            if (modelState == null)
            {
                throw new ArgumentNullException(nameof(modelState));
            }
            StatusCode = 422;
        }
    }
}
