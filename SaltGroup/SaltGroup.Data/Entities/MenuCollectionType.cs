namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("MenuCollectionType")]
    public partial class MenuCollectionType
    {
        [Key]
        [Column(Order = 0)]
        public Guid PKID { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(10)]
        public string CollectionType { get; set; }
    }
}
