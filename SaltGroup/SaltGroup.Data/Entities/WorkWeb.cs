namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("WorkWeb")]
    public partial class WorkWeb
    {
        public int ID { get; set; }

        public DateTime Date { get; set; }

        public string Subject { get; set; }

        [Column(TypeName = "ntext")]
        public string Description { get; set; }

        [StringLength(10)]
        public string Priority { get; set; }

        [StringLength(10)]
        public string Status { get; set; }
    }
}
