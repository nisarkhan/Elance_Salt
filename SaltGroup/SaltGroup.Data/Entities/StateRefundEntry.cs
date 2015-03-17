namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("StateRefundEntry")]
    public partial class StateRefundEntry
    {
        [Key]
        public Guid pkid { get; set; }

        public Guid? ClientPKID { get; set; }

        [StringLength(50)]
        public string BatchDescription { get; set; }

        [Column(TypeName = "money")]
        public decimal? AmountSubmitted { get; set; }

        [Column(TypeName = "money")]
        public decimal? AmountPaid { get; set; }

        [Column(TypeName = "money")]
        public decimal? DeniedAdjusted { get; set; }

        [Column(TypeName = "money")]
        public decimal? BalanceState { get; set; }

        [StringLength(50)]
        public string BatchNumber { get; set; }

        [Column(TypeName = "ntext")]
        public string Notes { get; set; }

        public DateTime? DateMTSMailed { get; set; }
    }
}
