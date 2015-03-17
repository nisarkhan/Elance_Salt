namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CollectionsRefundEntry")]
    public partial class CollectionsRefundEntry
    {
        [Key]
        public Guid PKID { get; set; }

        public Guid ClientPKID { get; set; }

        public Guid VendorPKID { get; set; }

        [Column(TypeName = "money")]
        public decimal? AmountReceived { get; set; }

        public DateTime? Date { get; set; }

        public Guid? RecoveryRep { get; set; }

        public Guid? ReceiveType { get; set; }

        [Column(TypeName = "ntext")]
        public string Notes { get; set; }
    }
}
