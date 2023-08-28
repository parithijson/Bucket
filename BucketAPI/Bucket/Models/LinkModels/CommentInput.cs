using Bucket.Models.tempModels;

namespace Bucket.Models.LinkModels
{
    public class CommentInput
    {
       
        public string CommentContent { get; set; } = string.Empty;
    
        public int UserID { get; set; }

        public int ProjectID { get; set; }
    }
}
