using Bucket.Models.LinkModels;
using Bucket.Service.Interface;
using MathNet.Numerics.Statistics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bucket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public ILogin _bucket;

        public LoginController(ILogin bucket)
        {
            _bucket = bucket;
        }

        [HttpPost]
        public async Task<ActionResult<AddUserResult>> LoginUser(LoginInput user)
        {
            try
            {
                var users = await _bucket.LoginUser(user);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
