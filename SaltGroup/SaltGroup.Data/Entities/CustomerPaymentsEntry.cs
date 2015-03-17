namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CustomerPaymentsEntry")]
    public partial class CustomerPaymentsEntry
    {
        [Key]
        public Guid pkid { get; set; }

        public Guid? ClientPKID { get; set; }

        [StringLength(50)]
        public string CheckNumber { get; set; }

        [Column(TypeName = "money")]
        public decimal? PrepayAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal? PrepayCredit { get; set; }

        [Column(TypeName = "money")]
        public decimal? PrepayBalance { get; set; }

        [Column(TypeName = "money")]
        public decimal? AppliedBalance { get; set; }

        [StringLength(50)]
        public string BatchNumber { get; set; }

        [Column(TypeName = "ntext")]
        public string Notes { get; set; }

        public DateTime? TimeStamp { get; set; }
    }
}
