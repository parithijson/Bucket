using Bucket.Models;
using Bucket.Models.LinkModels;
using Bucket.Models.tempModels;

namespace Bucket.Service.Interface
{
    public interface IComment
    { 
        Task<UpdateProjectResult> AddComment(int userid, CommentInput comment);
    }
}
