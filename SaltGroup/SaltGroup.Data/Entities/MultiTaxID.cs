namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("MultiTaxID")]
    public partial class MultiTaxID
    {
        [Key]
        [Column("MultiTaxID")]
        public int MultiTaxID1 { get; set; }

        [StringLength(10)]
        public string CustomerID { get; set; }

        [StringLength(10)]
        public string MultiTax { get; set; }
    }
}
