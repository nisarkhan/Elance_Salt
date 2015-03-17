namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("MenuContractConfirm")]
    public partial class MenuContractConfirm
    {
        [Key]
        public int ContractConfirmKey { get; set; }

        public int? ContractConfirmID { get; set; }

        [StringLength(50)]
        public string ContractConfirmDesc { get; set; }
    }
}
