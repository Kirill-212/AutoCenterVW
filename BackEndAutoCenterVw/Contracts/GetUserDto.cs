using System;

namespace Contracts
{
    public class GetUserDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Surname { get; set; }

        public DateTime DBay { get; set; }

        public string Status { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string RoleName { get; set; }

        public string UrlPhoto { get; set; }
    }
}
