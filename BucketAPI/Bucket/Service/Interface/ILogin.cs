using Bucket.Models.LinkModels;

namespace Bucket.Service.Interface
{
    public interface ILogin
    {
        Task<AddUserResult> LoginUser(LoginInput user);
    }
}
