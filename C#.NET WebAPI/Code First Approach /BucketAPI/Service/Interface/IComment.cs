using Bucket.Models.tempModels;

namespace Bucket.Service.Interface
{
    public interface IComment
    {
        Task<UpdateProjectResult> AddComment(int projectId, int userId);
    }
}
