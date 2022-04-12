namespace Domain.Exceptions
{
    public class CarRepairDateNotValid : BadRequestException
    {
        public CarRepairDateNotValid(string startWork,string endWork)
             : base($"Error: car repair date not valid ->{startWork} >{endWork}.")
        {
        }
    }
}
