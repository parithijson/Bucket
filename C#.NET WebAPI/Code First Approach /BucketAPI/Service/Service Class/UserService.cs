using Bucket.Context;
using Bucket.Global_Exceptions;
using Bucket.Models;
using Bucket.Models.LinkModels;
using Bucket.Service.Interface;
using Microsoft.EntityFrameworkCore;

namespace Bucket.Service.Service_Class
{
    public class UserService : IUsers
    {
        public BucketContext _userContext;

        public UserService(BucketContext bucketContext)
        {
               _userContext = bucketContext;
        }
        public async Task<AddUserResult> AddUsers(User user)
        {

            if (await _userContext.Users.AnyAsync(u => u.UserName == user.UserName))
            {
                throw new Exception(UserDetailsExceptions.UsernotFoundException["AlreadyExists"]);
            }
            if (await _userContext.Users.AnyAsync(u => u.UserEmail == user.UserEmail))
            {
                throw new Exception(UserDetailsExceptions.UsernotFoundException["AlreadyExists"]);
            }
            _userContext.Users.Add(user);
                await _userContext.SaveChangesAsync();
            return new AddUserResult
            {
                Success = true,
                Message = "User added successfully",
                UserId = user.UserID
            };


        }

        public  async Task<AddUserResult> DeleteUsers(int userId)
        {
            var user = await _userContext.Users
                .Include(u => u.Projects)
                .FirstOrDefaultAsync(u => u.UserID == userId);

            if (user == null)
            {
                return new AddUserResult
                {
                    Success = false,
                    Message = "User not found"
                };
            }

            if (user.Projects == null || user.Projects.Count == 0)
            {
                _userContext.Users.Remove(user);
                await _userContext.SaveChangesAsync();

                return new AddUserResult
                {
                    Success = true,
                    Message = "User deleted successfully"
                };
            }
            else
            {
                foreach (var project in user.Projects)
                {
                    DeleteProjectAndRelatedEntities(project);
                }

                _userContext.Users.Remove(user);
                await _userContext.SaveChangesAsync();

                return new AddUserResult
                {
                    Success = true,
                    Message = "User and related projects deleted successfully"
                };
            }
        }

        private void DeleteProjectAndRelatedEntities(Project project)
        {
            var projectLikes = _userContext.Likes
                .Where(like => like.ProjectID == project.ProjectID)
                .ToList();
            _userContext.Likes.RemoveRange(projectLikes);

            var projectComments = _userContext.Comments
                .Where(comment => comment.ProjectID == project.ProjectID)
                .ToList();
            _userContext.Comments.RemoveRange(projectComments);

            var projectMedia = _userContext.Medias
                .Where(media => media.ProjectID == project.ProjectID)
                .ToList();
            _userContext.Medias.RemoveRange(projectMedia);

            var projectTags = _userContext.ProjectTags
                .Where(tag => tag.ProjectID == project.ProjectID)
                .ToList();
            _userContext.ProjectTags.RemoveRange(projectTags);

            _userContext.Projects.Remove(project);
        }

    public async Task<AddUserResult> UpdateUsers(int id, User user)
        {
            User ruser= await _userContext.Users.FindAsync(id);
            if (ruser == null)
            {
                throw new Exception(UserDetailsExceptions.UsernotFoundException["NotFound"]);
            }
            else
            {
                ruser.UserName = user.UserName;
                ruser.UserEmail = user.UserEmail;
                ruser.UserPassword = user.UserPassword;
                ruser.UserPrfilePicture = user.UserPrfilePicture;
                ruser.UserBio = user.UserBio;

                await _userContext.SaveChangesAsync();


                return new AddUserResult
                {
                    Success = true,
                    Message = "User updated successfully",
                    UserId = user.UserID
                };
            }
        }

        public async Task<User> GetUserById(int id)
        {
            var user = await _userContext.Users.FindAsync(id);
            return user;
        }
    }
}
