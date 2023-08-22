using Bucket.Models.tempModels;

namespace Bucket.Service.Interface
{
    public interface ISearch
    {

        Task<List<HomePageProjection>> SearchByNames(string content);
    }
}
