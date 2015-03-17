namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Track")]
    public partial class Track
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string pkid { get; set; }

        public decimal? TaxPaid { get; set; }

        public decimal? TaxAccrued { get; set; }

        public DateTime? NextContact { get; set; }

        [StringLength(50)]
        public string StateAudit { get; set; }

        [StringLength(50)]
        public string PhoneNumber { get; set; }

        [StringLength(50)]
        public string Extension { get; set; }

        [StringLength(50)]
        public string Location { get; set; }

        [StringLength(50)]
        public string ClaimNum { get; set; }

        public DateTime? EstimatePayDate { get; set; }

        public decimal? EstimateBilling { get; set; }

        [StringLength(50)]
        public string Status { get; set; }

        [StringLength(50)]
        public string State { get; set; }

        [StringLength(50)]
        public string ClaimTaxID { get; set; }
    }
}
