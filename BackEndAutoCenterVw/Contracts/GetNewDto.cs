using System;
using System.Collections.Generic;

namespace Contracts
{
    public class GetNewDto
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime CreatedDate { get; set; }

        public bool IsDeleted { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public List<ImgDto> Imgs { get; set; }
    }
}
