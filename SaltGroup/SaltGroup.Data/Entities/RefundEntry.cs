namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("RefundEntry")]
    public partial class RefundEntry
    {
        [Key]
        public Guid PKID { get; set; }

        public Guid ClientPKID { get; set; }

        public Guid VendorPKID { get; set; }

        [Column(TypeName = "money")]
        public decimal? AmountIdentified { get; set; }

        public Guid StateIdentified { get; set; }

        [Column(TypeName = "money")]
        public decimal? Adjusted { get; set; }

        public Guid CollectionNote { get; set; }

        [Column(TypeName = "money")]
        public decimal? AmountRecovered { get; set; }

        [StringLength(10)]
        public string BatchNumber { get; set; }

        [Column(TypeName = "ntext")]
        public string Notes { get; set; }

        public Guid? RecoveryType { get; set; }

        [Column(TypeName = "money")]
        public decimal? LeftToRecover { get; set; }
    }
}
