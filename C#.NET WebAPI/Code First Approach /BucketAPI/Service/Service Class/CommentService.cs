using Bucket.Models.tempModels;
using Bucket.Service.Interface;

namespace Bucket.Service.Service_Class
{
    public class CommentService : IComment
    {
        public Task<UpdateProjectResult> AddComment(int projectId, int userId)
        {
            throw new NotImplementedException();
        }
    }
}
