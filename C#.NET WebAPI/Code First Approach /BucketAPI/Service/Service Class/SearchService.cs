using Bucket.Context;
using Bucket.Global_Exceptions;
using Bucket.Models.tempModels;
using Bucket.Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace Bucket.Service.Service_Class
{
    public class SearchService : ISearch
    {
        public BucketContext _bucketContext;
        public SearchService(BucketContext bucketContext)
        {
            _bucketContext = bucketContext;
        }
        public async Task<List<HomePageProjection>> SearchByNames(string content)
        {
            var HomePageProjectionList = await(from project in _bucketContext.Projects
                                               join user in _bucketContext.Users on project.UserID equals user.UserID
                                               join media in _bucketContext.Medias on project.ProjectID equals media.ProjectID into mediagroup
                                               where project.ProjectTitle.Contains(content) ||
                                              user.UserName.Contains(content) ||
                                              project.ProjectTags.Any(pt => pt.Tags.TagName.Contains(content))
                                               select new HomePageProjection
                                               {
                                                   ProjectID = project.ProjectID,
                                                   ProjectTitle = project.ProjectTitle,
                                                   UserName = project.Users.UserName,
                                                   LikeCount = _bucketContext.Likes.Count(like => like.ProjectID == project.ProjectID),
                                                   MediaURL = mediagroup.Select(mg => mg.MediaURL).Where(Mediaurl => Mediaurl != null).First()


                                               }).ToListAsync();
            if (HomePageProjectionList == null || HomePageProjectionList.Count == 0)
            {
                throw new Exception(UserDetailsExceptions.UsernotFoundException["NotFound"]);
            }
            else
            {
                return HomePageProjectionList;
            }
        }

        public Task<List<HomePageProjection>> SearchByTagName()
        {
            throw new NotImplementedException();
        }

        public Task<List<HomePageProjection>> SearchByUserName()
        {
            throw new NotImplementedException();
        }
    }
}
