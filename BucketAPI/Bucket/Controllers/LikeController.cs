using Bucket.Models.tempModels;
using Bucket.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bucket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        public ILike _bucket;
        public LikeController(ILike bucket)
        {
            _bucket = bucket;
        }

        [HttpPost]
        public async Task<ActionResult<PostProjectResult>> LikeProject(int projectId, int userId)
        {
            var projects = await _bucket.LikeProject(projectId, userId);
            return Ok(projects);

        }
    }
}
