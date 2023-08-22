using Bucket.Context;
using Bucket.Models;
using Bucket.Models.tempModels;
using Bucket.Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace Bucket.Service.Service_Class
{
    public class LikeService : ILike
    {
        public BucketContext _bucketContext;
        public LikeService(BucketContext bucketContext)
        {
            _bucketContext = bucketContext;
        }
        public async Task<PostProjectResult> LikeProject(int projectId, int userId)
        {
            var project = await _bucketContext.Projects.FindAsync(projectId);

            if (project == null)
            {
                return new PostProjectResult
                {
                    Success = false,
                    Message = "Project not found"
                };
            }
            var existingLike = await _bucketContext.Likes
                .FirstOrDefaultAsync(like => like.ProjectID == projectId && like.UserID == userId);

            if (existingLike != null)
            {
                _bucketContext.Likes.Remove(existingLike);
                await _bucketContext.SaveChangesAsync();

                return new PostProjectResult
                {
                    Success = true,
                    Message = "Project unliked successfully"
                };
            }
            else
            {
                var newLike = new Like
                {
                    ProjectID = projectId,
                    UserID = userId

                };

                _bucketContext.Likes.Add(newLike);
                await _bucketContext.SaveChangesAsync();

                return new PostProjectResult
                {
                    Success = true,
                    Message = "Project liked successfully"
                };
            }
        }
    }
}
