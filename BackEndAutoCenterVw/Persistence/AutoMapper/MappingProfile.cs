using AutoMapper;
using Contracts;
using Domain.Models;
using Domain.Models.CarEquipment;

namespace Persistence.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PostUserDto, User>();
            CreateMap<PutUserDto, User>();
            CreateMap<User, GetUserDto>()
                .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.RoleName))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
            CreateMap<PostEmployeeDto, Employee>();
            CreateMap<PutEmployeeDto, Employee>();
            CreateMap<Employee, GetEmployeeDto>()
                .ForMember(dest => dest.GetUserDto, opt => opt.MapFrom(src => src.User));
            CreateMap<PostNewDto, New>();
            CreateMap<PutNewDto, New>();
            CreateMap<ImgDto, Img>();
            CreateMap<Img, ImgDto>();
            CreateMap<New, GetNewDto>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.Employee.User.LastName))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.Employee.User.FirstName))
                .ForMember(dest => dest.Imgs, opt => opt.MapFrom(src => src.Imgs));
            CreateMap<PostCarDto, Car>();
            CreateMap<ImgDto, ImgCar>();
            CreateMap<PutCarDto, Car>()
                 .ForMember(dest => dest.ImgsCar, opt => opt.MapFrom(src => src.Imgs));
            CreateMap<PostClientCarDto, ClientCar>()
                .ForMember(dest => dest.Car, opt => opt.MapFrom(src => src.PostCarDto))
                .ForPath(dest => dest.Car.ImgsCar, opt => opt.MapFrom(src => src.PostCarDto.Imgs));
            CreateMap<PutClientCarDto, ClientCar>()
                .ForMember(dest => dest.Car, opt => opt.MapFrom(src => src.PutCarDto))
                .ForPath(dest => dest.Car.ImgsCar, opt => opt.MapFrom(src => src.PutCarDto.Imgs));
            CreateMap<ValueCarEquipment, ValueCarEquipmentDto>();
            CreateMap<ValueCarEquipmentDto, ValueCarEquipment>();
            CreateMap<PutValueCarEquipmentDto, ValueCarEquipment>();
            CreateMap<PutValueCarEquipmentDto, ValueCarEquipmentDto>();
            CreateMap<PostCarEquipmentFormDto, CarEquipmentForm>()
                .ForMember(dest => dest.EquipmentItems, opt => opt.MapFrom(src => src.EquipmentItems));
            CreateMap<PutCarEquipmentFormDto, CarEquipmentForm>()
                .ForMember(dest => dest.EquipmentItems, opt => opt.MapFrom(src => src.EquipmentItems));
            CreateMap<CarEquipmentForm, CarEquipmentFormDto>()
                .ForMember(dest => dest.EquipmentItems, opt => opt.MapFrom(src => src.EquipmentItems));
            CreateMap<CarEquipmentFormItemDto, CarEquipmentFormItem>();
            CreateMap<PostCarEquipmentDto, CarEquipment>()
                .ForMember(dest => dest.Equipments, opt => opt.MapFrom(src => src.Equipments));
            CreateMap<PutCarEquipmentDto, CarEquipment>()
               .ForMember(dest => dest.Equipments, opt => opt.MapFrom(src => src.Equipments));

            CreateMap<Car, GetCarDto>()
                 .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.ClientCar.User))
                 .ForMember(dest => dest.Car, opt => opt.MapFrom(src => src));
            CreateMap<Order, GetOrderBuyerDto>()
     .ForMember(dest => dest.Order, opt => opt.MapFrom(src => src))
     .ForMember(dest => dest.ClientCar, opt => opt.MapFrom(src => src.Car.ClientCar));
            CreateMap<CarRepair, GetCarRepairDto>()
                .ForMember(dest => dest.CarRepair, opt => opt.MapFrom(src => src))
                 .ForMember(dest => dest.CarUser, opt => opt.MapFrom(src => src.Car.ClientCar.User))
                  .ForMember(dest => dest.Emp, opt => opt.MapFrom(src => src.Employee.User))
                   .ForMember(dest => dest.Car, opt => opt.MapFrom(src => src.Car));
        }
    }
}
