namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CallLog")]
    public partial class CallLog
    {
        [Key]
        public Guid PKID { get; set; }

        public Guid EntryPKID { get; set; }

        public DateTime date { get; set; }

        public Guid rep { get; set; }

        [Column(TypeName = "ntext")]
        public string notes { get; set; }
    }
}
