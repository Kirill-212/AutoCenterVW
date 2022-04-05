namespace Domain.Exceptions
{
    public class CarRepairDateIsNotValid : BadRequestException
    {
        public CarRepairDateIsNotValid(string startWork, string endWork)
             : base($"Error you have cars to repair between these dates ->{startWork} >{endWork}")
        {
        }
    }
}