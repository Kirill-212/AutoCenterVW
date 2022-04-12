using Domain.MailSettings;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using Services.Abstractions;
using System.Threading.Tasks;

namespace Services
{
    public class AsyncMailService : IMailService
    {
        private readonly MailSetting _mailSettings;
        public AsyncMailService(IOptions<MailSetting> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        public async Task SendEmailAsync(string email)
        {
            var emailSend = new MimeMessage();
            emailSend.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            emailSend.To.Add(MailboxAddress.Parse(email));
            emailSend.Subject ="Auto center vw";
            var builder = new BodyBuilder
            {
                HtmlBody = "<h4>The car has been repaired. Pick up your car.<p>Please call the call center for further instructions.</p></h4>"
            };
            emailSend.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(emailSend);
            smtp.Disconnect(true);
        }
    }
}
