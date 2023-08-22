using Bucket.Models;
using Bucket.Models.LinkModels;

namespace Bucket.Service.Interface
{
    public interface IUsers
    {
        //Users API Endpoint
        Task<AddUserResult> AddUsers(User users);
        Task<AddUserResult> UpdateUsers(int id, User users);
        Task<AddUserResult> DeleteUsers(int id);
        Task<User> GetUserById(int id);

    }
}
