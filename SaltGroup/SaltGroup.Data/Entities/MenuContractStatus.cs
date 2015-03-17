namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class MenuContractStatus
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ContractStautsKey { get; set; }

        public int? ContractStatusID { get; set; }

        [Required]
        [StringLength(50)]
        public string ContractStatusDesc { get; set; }
    }
}
