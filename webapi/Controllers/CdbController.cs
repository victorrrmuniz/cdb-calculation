using Microsoft.AspNetCore.Mvc;
using webapi.Services;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CdbController : ControllerBase
    {
        private readonly ICdbService _cdbService;
        public CdbController(ICdbService cdbService)
        {
            _cdbService = cdbService;
        }

        [HttpGet]
        public IActionResult Get(double monetaryValue, int month)
        {
            var result = _cdbService.Calculate(monetaryValue, month);

            return Ok(result);
        }
    }
}
