namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CreditInterestReveived")]
    public partial class CreditInterestReveived
    {
        [Key]
        public Guid ClientPKID { get; set; }

        [StringLength(100)]
        public string Number { get; set; }
    }
}
