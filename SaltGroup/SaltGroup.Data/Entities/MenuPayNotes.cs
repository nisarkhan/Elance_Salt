namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class MenuPayNotes
    {
        [Key]
        public int PayNotesKey { get; set; }

        public int? PayNotesID { get; set; }

        [Required]
        [StringLength(50)]
        public string PayNotesDesc { get; set; }
    }
}
