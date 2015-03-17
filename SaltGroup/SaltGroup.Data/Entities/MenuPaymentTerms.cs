namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class MenuPaymentTerms
    {
        [Key]
        public int PaymentKey { get; set; }

        public int? PaymentID { get; set; }

        [StringLength(50)]
        public string Terms { get; set; }

        [StringLength(10)]
        public string Calculation { get; set; }
    }
}
