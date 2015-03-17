namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("MenuAssigned")]
    public partial class MenuAssigned
    {
        [Key]
        public int AssignedKey { get; set; }

        public int? AssignedID { get; set; }

        [StringLength(50)]
        public string AssignedDesc { get; set; }
    }
}
