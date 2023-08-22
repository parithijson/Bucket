using Bucket.Models.tempModels;

namespace Bucket.Service.Interface
{
    public interface ILike
    {

        Task<PostProjectResult> LikeProject(int projectId,int userId);
    }
}
