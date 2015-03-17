namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("TrackLog")]
    public partial class TrackLog
    {
        public int ID { get; set; }

        public Guid pkid { get; set; }

        public DateTime Date { get; set; }

        [Column(TypeName = "text")]
        public string Notes { get; set; }

        [StringLength(256)]
        public string username { get; set; }
    }
}
