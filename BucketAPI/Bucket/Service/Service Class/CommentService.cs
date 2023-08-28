using Bucket.Models.LinkModels;
using Bucket.Models;
using Bucket.Models.tempModels;
using Bucket.Service.Interface;
using Bucket.Context;

namespace Bucket.Service.Service_Class
{
    public class CommentService : IComment
    {
        public BucketContext _bucketContext;

        public CommentService(BucketContext bucketContext)
        {
            _bucketContext = bucketContext;
        }
        public async Task<UpdateProjectResult> AddComment(int userid, CommentInput input)
        {

            var newComment = new Comment
            {
                CommentContent = input.CommentContent,
                CommentedAt=DateTime.Now,
                UserID = userid,
                ProjectID=input.ProjectID
                
            };
            _bucketContext.Comments.Add(newComment);
            await _bucketContext.SaveChangesAsync();

            return new UpdateProjectResult
            {
                Success = true,
                Message = "Commented successfully"
            };

        }
    }
}
