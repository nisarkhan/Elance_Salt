namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("MenuRecoveryType")]
    public partial class MenuRecoveryType
    {
        [Key]
        public Guid PKID { get; set; }

        [Required]
        [StringLength(50)]
        public string RecoveryType { get; set; }

        public int Sort { get; set; }
    }
}
