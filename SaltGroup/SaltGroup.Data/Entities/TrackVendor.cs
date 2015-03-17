namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("TrackVendor")]
    public partial class TrackVendor
    {
        public int ID { get; set; }

        public Guid pkid { get; set; }

        [StringLength(50)]
        public string VendorName { get; set; }

        public int? VendorTPID { get; set; }

        public decimal? Amount { get; set; }

        [StringLength(50)]
        public string StateAuditor { get; set; }

        [StringLength(50)]
        public string Phonenumber { get; set; }

        [StringLength(50)]
        public string Extension { get; set; }

        [StringLength(50)]
        public string Location { get; set; }

        public DateTime? EstimatePayDate { get; set; }

        public decimal? EstimateBilling { get; set; }

        [StringLength(50)]
        public string Status { get; set; }
    }
}
