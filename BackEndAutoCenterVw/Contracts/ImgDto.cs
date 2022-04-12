using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class ImgDto
    {
        [Required(ErrorMessage = "Error: url is required.")]
        public string Url { get; set; }
    }
}
