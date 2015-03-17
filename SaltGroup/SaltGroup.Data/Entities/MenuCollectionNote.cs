namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("MenuCollectionNote")]
    public partial class MenuCollectionNote
    {
        [Key]
        public Guid CollectionNotePKID { get; set; }

        [StringLength(10)]
        public string CollectionNoteName { get; set; }
    }
}
