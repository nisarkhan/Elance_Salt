namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("VendorLog")]
    public partial class VendorLog
    {
        public int ID { get; set; }

        public int TrackVendor { get; set; }

        public DateTime Date { get; set; }

        [Column(TypeName = "text")]
        public string VendorNotes { get; set; }
    }
}
