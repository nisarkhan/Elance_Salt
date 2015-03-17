namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Vendors
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid VendorPKID { get; set; }

        [StringLength(10)]
        [Display(Name="Vendor Code")]
        public string VendorCode { get; set; }

        [StringLength(50)]
        [Display(Name="Company Legal Name")]
        public string CompanyLegalName { get; set; }

        [StringLength(50)]
        public string DBA { get; set; }

        [StringLength(50)]
        [Display(Name="Mr Ms")]
        public string MrMs { get; set; }

        [StringLength(30)]
        [Display(Name="Contact First Name")]
        public string ContactFirstName { get; set; }

        [StringLength(50)]
        [Display(Name="Contact Last Name")]
        public string ContactLastName { get; set; }

        [StringLength(50)]
        [Display(Name="Contact Title")]
        public string ContactTitle { get; set; }

        [StringLength(30)]
        [Display(Name="Phone Number")]
        public string PhoneNumber { get; set; }

        [StringLength(30)]
        public string Extension { get; set; }

        [StringLength(30)]
        [Display(Name="Fax Number")]
        public string FaxNumber { get; set; }

        [StringLength(50)]
        [EmailAddress]
        [Display(Name="Email Address")]
        public string EmailAddress { get; set; }

        [Column(TypeName = "ntext")]
        public string Notes { get; set; }

        [StringLength(50)]
        public string Address { get; set; }

        [StringLength(50)]
        public string City { get; set; }

        [StringLength(50)]
        public string State { get; set; }

        [StringLength(50)]
        public string Zip { get; set; }

        [Display(Name="Tax ID")]
        public bool TaxID { get; set; }

        public bool MultiTaxID { get; set; }

        public bool BillingAddressSame { get; set; }

        public bool BillingContactSame { get; set; }

        [StringLength(50)]
        public string ClientLocation { get; set; }
    }
}
