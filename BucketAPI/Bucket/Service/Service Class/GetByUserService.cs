using Bucket.Context;
using Bucket.Global_Exceptions;
using Bucket.Models.tempModels;
using Bucket.Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace Bucket.Service.Service_Class
{
    public class GetByUserService : IGetByUser
    {
        public BucketContext _bucketContext;
        public GetByUserService(BucketContext bucketContext)
        {
            _bucketContext = bucketContext;
        }

        public async Task<List<HomePageProjection>> GetAllProjectsByUserID(int userid)
        {
            var HomePageProjectionList = await (from project in _bucketContext.Projects
                                                join user in _bucketContext.Users on project.UserID equals user.UserID
                                                join media in _bucketContext.Medias on project.ProjectID equals media.ProjectID into mediagroup
                                                where project.UserID == userid
                                                select new HomePageProjection
                                                {
                                                    ProjectID = project.ProjectID,
                                                    ProjectTitle = project.ProjectTitle,
                                                    ProjectCreatedAt = (DateTime)project.ProjectCreatedAt,
                                                    

                                                    UserName = project.Users.UserName,
                                                    LikeCount = _bucketContext.Likes.Count(like => like.ProjectID == project.ProjectID),
                                                    MediaURL = mediagroup.Select(mg => mg.MediaURL).Where(Mediaurl => Mediaurl != null).First()


                                                }).ToListAsync();
            if (HomePageProjectionList == null)
            {
                throw new Exception(UserDetailsExceptions.UsernotFoundException["NotFound"]);
            }
            else
            {
                return HomePageProjectionList;
            }
        }
    }
}
