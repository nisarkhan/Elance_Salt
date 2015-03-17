namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class MenuContractTypes
    {
        [Key]
        [StringLength(25)]
        public string TypeOfContract { get; set; }

        [Required]
        [StringLength(2)]
        public string Code { get; set; }
    }
}
