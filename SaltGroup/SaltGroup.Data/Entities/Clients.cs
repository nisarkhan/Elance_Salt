namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Clients
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerID { get; set; }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ClientPKID { get; set; }

        [StringLength(256)]
        [Display(Name = "Client Code")]
        public string ClientCode { get; set; }

        [StringLength(256)]
        [Display(Name="Company Legal Name")]
        public string CompanyLegalName { get; set; }

        [StringLength(256)]
        public string DBA { get; set; }

        [StringLength(256)]
        [Display(Name="Mr Ms")]
        public string MrMs { get; set; }

        [StringLength(256)]
        [Display(Name="Contact First Name")]
        public string ContactFirstName { get; set; }

        [StringLength(256)]
        [Display(Name="Contact Last Name")]
        public string ContactLastName { get; set; }

        [StringLength(256)]
        [Display(Name="Contact Title")]
        public string ContactTitle { get; set; }

        [Required]
        [StringLength(256)]
        [Display(Name="Phone Number")]
        public string PhoneNumber { get; set; }

        [StringLength(256)]
        public string Extension { get; set; }

        [StringLength(256)]
        [Display(Name="Fax Number")]
        public string FaxNumber { get; set; }

        [StringLength(256)]
        [Display(Name="Email Address")]
        public string EmailAddress { get; set; }

        [Column(TypeName = "ntext")]
        public string Notes { get; set; }

        [StringLength(256)]
        public string Address { get; set; }

        [StringLength(256)]
        public string City { get; set; }

        [StringLength(256)]
        public string State { get; set; }

        [StringLength(256)]
        public string Zip { get; set; }

        [StringLength(256)]
        [Display(Name="Tax ID")]
        public string TaxID { get; set; }

        public bool MultiTaxID { get; set; }

        public bool BillingAddressSame { get; set; }

        public bool BillingContactSame { get; set; }

        [StringLength(256)]
        public string BillingAddress { get; set; }

        [StringLength(256)]
        public string BillingCity { get; set; }

        [StringLength(256)]
        public string BillingState { get; set; }

        [StringLength(256)]
        public string ZipCode { get; set; }

        [StringLength(256)]
        public string BillingContactTitle { get; set; }

        [StringLength(256)]
        public string BillingInfo_PhoneNumber { get; set; }

        [StringLength(256)]
        public string BillingInfo_Extension { get; set; }

        [StringLength(256)]
        public string BillingInfo_FaxNumber { get; set; }

        [StringLength(256)]
        public string BillingInfo_EmailAddress { get; set; }

        [Column(TypeName = "ntext")]
        public string BillingInfo_Notes { get; set; }

        [StringLength(256)]
        public string BillingInfo_ContactFirstName { get; set; }

        [StringLength(256)]
        public string BillingInfo_ContactLastName { get; set; }

        [StringLength(256)]
        public string BillingInfo_MrMrs { get; set; }

        [StringLength(256)]
        public string RecordsAddress { get; set; }

        [StringLength(256)]
        public string RecordsCity { get; set; }

        [StringLength(256)]
        public string RecordsState { get; set; }

        [StringLength(256)]
        public string RecordsZip { get; set; }

        public bool RecordsAddressSame { get; set; }

        [StringLength(256)]
        public string TypeOfContract { get; set; }

        [StringLength(256)]
        public string Contracts_City { get; set; }

        [StringLength(256)]
        public string Contracts_State { get; set; }

        [StringLength(256)]
        public string SalesPerson { get; set; }

        public Guid? PrimarySalesStaff { get; set; }

        public Guid? SecondarySalesStaff { get; set; }

        [StringLength(256)]
        public string BusinessDevRep { get; set; }

        [StringLength(256)]
        public string PrimaryConsultant { get; set; }

        [StringLength(256)]
        public string SecondaryConsultant { get; set; }

        [StringLength(256)]
        public string GMRevenue { get; set; }

        [StringLength(256)]
        public string FeeTerms { get; set; }

        [StringLength(256)]
        public string ContractDateSigned { get; set; }

        [StringLength(256)]
        public string ContractSignedBy { get; set; }

        [StringLength(256)]
        public string ContractTitle { get; set; }

        public DateTime? TentativeAuditDate { get; set; }

        [StringLength(256)]
        public string Auditor { get; set; }

        public Guid? Auditors_Key { get; set; }

        [StringLength(256)]
        public string OldAuditors_Key { get; set; }

        [StringLength(256)]
        public string Third3rdAuditor { get; set; }

        public int JKHStatus { get; set; }

        public DateTime? ScheduledAuditDate { get; set; }

        [StringLength(256)]
        public string Confirmed { get; set; }

        [StringLength(256)]
        public string PPMT { get; set; }

        [StringLength(256)]
        public string FuturesRate { get; set; }

        [StringLength(256)]
        public string FuturesInstallments { get; set; }

        public bool CancelationFee { get; set; }

        [StringLength(256)]
        public string CancelationFeeAmount { get; set; }

        public bool CancelationFeeBilled { get; set; }

        public bool DiscountOffered { get; set; }

        public DateTime? DateDiscountOffered { get; set; }

        [Column(TypeName = "money")]
        public decimal? AmountofDiscount { get; set; }

        [Column(TypeName = "money")]
        public decimal? EstimateDollarAmount { get; set; }

        public DateTime? EstimateDollarAmountReceivedDate { get; set; }

        [StringLength(256)]
        public string AccountRep { get; set; }

        [StringLength(256)]
        public string PersonToCalculate { get; set; }

        public DateTime? DateAssignedToRep { get; set; }

        public DateTime? EstDateCalculation { get; set; }

        public DateTime? DateCalculated { get; set; }

        [Column(TypeName = "money")]
        public decimal? CalculatedAmount { get; set; }

        public DateTime? EstDateReportToBeDone { get; set; }

        public DateTime? ReportDate { get; set; }

        [StringLength(256)]
        public string ReportAmount { get; set; }

        [StringLength(256)]
        public string LOADate { get; set; }

        [StringLength(256)]
        public string PayNotes { get; set; }

        public DateTime? ReportChecklistReceived { get; set; }

        public DateTime? AdditionsReceived { get; set; }

        public DateTime? FinalReportDate { get; set; }

        [Column(TypeName = "money")]
        public decimal? FinalReportAmount { get; set; }

        [Column(TypeName = "money")]
        public decimal? NonRefundAdvance { get; set; }

        [Column(TypeName = "money")]
        public decimal? NonRefundContract { get; set; }

        [Column(TypeName = "money")]
        public decimal? NonRefundPrePay { get; set; }

        [Column(TypeName = "money")]
        public decimal? NonRefundFuture { get; set; }

        [Column(TypeName = "ntext")]
        public string CommentSalesTracking { get; set; }

        [StringLength(256)]
        public string Assigned { get; set; }

        [Required]
        [StringLength(256)]
        public string Travel { get; set; }

        public int RentalCar { get; set; }

        public DateTime? AuditDate { get; set; }

        [Column(TypeName = "ntext")]
        public string ARMeetingStatus { get; set; }

        public DateTime? InKerr { get; set; }

        public Guid? AcctRep { get; set; }

        [StringLength(256)]
        public string PayDate { get; set; }

        public Guid? SecondaryAuditor { get; set; }

        public DateTime? CollectionsReportDate { get; set; }

        public DateTime? CollectionsDateRecvd { get; set; }

        public DateTime? CollectionsDateAssigned { get; set; }

        public Guid? CollectionsAssignedTo { get; set; }

        public DateTime? CollectionsDatePktRecvd { get; set; }

        [Column(TypeName = "ntext")]
        public string CollectionsNotes { get; set; }

        public DateTime? LastCallDate { get; set; }

        public bool? CollectionClosed { get; set; }

        public int? ofLocations { get; set; }

        [StringLength(256)]
        public string LeadSource { get; set; }

        public decimal? ReviewRevenue { get; set; }

        public int? EmployeeCount { get; set; }

        public DateTime? JobFinalDate { get; set; }
    }
}
