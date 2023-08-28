using Bucket.Models.tempModels;
using Bucket.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bucket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetByUserController : ControllerBase
    {
        public IGetByUser _bucket;
        public GetByUserController(IGetByUser bucket)
        {
            _bucket = bucket;
        }

        [HttpGet]
        public async Task<ActionResult<List<HomePageProjection>>> GetAllProjectsByUserID(int userid)
        {
            var projects = await _bucket.GetAllProjectsByUserID(userid);
            if (projects == null)
            {
                return NotFound();
            }
            return Ok(projects);

        }
    }
}
