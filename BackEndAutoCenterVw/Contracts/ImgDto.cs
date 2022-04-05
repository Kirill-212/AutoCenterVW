using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class ImgDto
    {
        [Required]
        public string Url { get; set; }
    }
}
