using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class NewWrapperDto<T>
    {
        [Required(ErrorMessage = "Error: new is required.")]
        public T New { get; set; }

        [Required(ErrorMessage = "Error: img/imgs is required.")]
        public List<ImgDto> Imgs { get; set; }
    }
}
