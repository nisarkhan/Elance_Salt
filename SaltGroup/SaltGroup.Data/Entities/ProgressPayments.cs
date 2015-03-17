namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ProgressPayments
    {
        [Key]
        public Guid ClientPKID { get; set; }

        [Column(TypeName = "money")]
        public decimal? ProgressPayment { get; set; }
    }
}
