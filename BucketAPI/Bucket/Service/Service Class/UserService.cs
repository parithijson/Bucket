using Bucket.Context;
using Bucket.Global_Exceptions;
using Bucket.Models;
using Bucket.Models.LinkModels;
using Bucket.Service.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
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
        public async Task<AddUserResult> AddUsers(AddUserLink user)
        {
            // Check if the provided username is unique
            if (await _userContext.Users.AnyAsync(u => u.UserName == user.UserName))
            {
                return new AddUserResult
                {
                    Success = false,
                    Message = "Username is already taken"
                };
            }

            // Check if the provided user email is unique
            if (await _userContext.Users.AnyAsync(u => u.UserEmail == user.UserEmail))
            {
                return new AddUserResult
                {
                    Success = false,
                    Message = "User email is already registered"
                };
            }

            var newUser = new User
            {
                UserName = user.UserName,
                UserEmail = user.UserEmail,
                UserPassword = user.UserPassword
            };

            _userContext.Users.Add(newUser);
            await _userContext.SaveChangesAsync();
            return new AddUserResult
            {
                Success = true,
                Message = "User registered successfully",
                UserId = newUser.UserID
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
