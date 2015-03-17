namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("FutureBenefitsEntry")]
    public partial class FutureBenefitsEntry
    {
        [Key]
        public Guid pkid { get; set; }

        public Guid? ClientPKID { get; set; }

        [StringLength(50)]
        public string Installment { get; set; }

        [Column(TypeName = "money")]
        public decimal? OriginalAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal? Adjusted { get; set; }

        [StringLength(50)]
        public string CollectionNote { get; set; }

        [Column(TypeName = "money")]
        public decimal? AmountRecovered { get; set; }

        [StringLength(50)]
        public string BatchNumber { get; set; }

        [Column(TypeName = "ntext")]
        public string Notes { get; set; }
    }
}
