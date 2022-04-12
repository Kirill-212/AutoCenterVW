using System.ComponentModel.DataAnnotations;

namespace Contracts
{
    public class CarEquipmentFormItemDto
    {
        [Required(ErrorMessage = "Error: car equipment form name is required.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Error: equipment item is required.")]
        public ValueCarEquipmentDto EquipmentItem { get; set; }

    }
}
