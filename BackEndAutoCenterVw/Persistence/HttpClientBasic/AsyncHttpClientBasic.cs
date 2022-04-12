using Domain.HttpClent;
using System.Threading.Tasks;
using System.Net.Http;
using Contracts;
using Newtonsoft.Json;
using System.Text;

namespace BackEndAutoCenterVw.HttpClientBasic
{
    public class AsyncHttpClientBasic : IAsynHttpClient<PayDataDto>
    {
        private protected HttpClient httpClient;
        private readonly string Uri;

        public AsyncHttpClientBasic(string uri)
        {
            Uri = uri;
            httpClient = new HttpClient();
        }

        public async Task<bool> Post(PayDataDto item)
        {
            var response = await httpClient.PostAsync(
                 Uri,
                 new StringContent(JsonConvert.SerializeObject(item),
                 Encoding.UTF8,
                 "application/json"
                 ));

            return response.IsSuccessStatusCode;
        }
    }
}
