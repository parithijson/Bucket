using Bucket.Models.tempModels;
using Bucket.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bucket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        public ISearch _bucket;
        public SearchController(ISearch bucket)
        {
            _bucket = bucket;
        }

        [HttpGet("{content}")]
        public async Task<ActionResult<List<HomePageProjection>>> SearchByNames(string content)
        {
            var projects = await _bucket.SearchByNames(content);
            if (projects == null)
            {
                return NotFound();
            }
            return Ok(projects);

        }
    }
}
