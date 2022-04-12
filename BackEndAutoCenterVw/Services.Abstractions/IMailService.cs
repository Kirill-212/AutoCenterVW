using System.Threading.Tasks;

namespace Services.Abstractions
{
    public interface IMailService
    {
        Task SendEmailAsync(string email);
    }
}
