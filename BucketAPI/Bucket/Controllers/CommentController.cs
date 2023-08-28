using Bucket.Models.tempModels;
using Bucket.Models;
using Bucket.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Bucket.Models.LinkModels;

namespace Bucket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        public IComment _bucket;
        public CommentController(IComment bucket)
        {
            _bucket = bucket;
        }
        [HttpPost]
        public async Task<ActionResult<UpdateProjectResult>> AddComment(int userid, CommentInput comment)
        {
            var projects = await _bucket.AddComment(userid, comment);
            return Ok(projects);

        }

    }


    }

