using Bucket.Models.tempModels;

namespace Bucket.Service.Interface
{
    public interface IGetByUser
    {
        Task<List<HomePageProjection>> GetAllProjectsByUserID(int userid);
    }
}
