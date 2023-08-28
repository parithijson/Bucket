using Bucket.Context;
using Bucket.Models.LinkModels;
using Bucket.Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace Bucket.Service.Service_Class
{
    public class LoginService : ILogin
    {
        public BucketContext _userContext;

        public LoginService(BucketContext bucketContext)
        {
            _userContext = bucketContext;
        }
        public async Task<AddUserResult> LoginUser(LoginInput user)
        {
            var UserId = await _userContext.Users.FirstOrDefaultAsync(u => u.UserName == user.UserName);
            if (await _userContext.Users.AnyAsync(u => u.UserName == user.UserName) && await _userContext.Users.AnyAsync(u => u.UserPassword == user.UserPassword))
            {
                return new AddUserResult
                {
                    Success = true,
                    Message = "Login Successfull",
                    UserId = UserId.UserID
                };
            }
            return new AddUserResult
            {
                Success = false,
                Message = "Invalid Credentials",
            };
        }
    }
}
