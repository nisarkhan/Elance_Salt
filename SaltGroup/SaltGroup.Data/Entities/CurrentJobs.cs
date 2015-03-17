namespace SaltGroup.Data.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CurrentJobs
    {
        public int ID { get; set; }

        [Column("SHORT CODE")]
        [StringLength(255)]
        public string SHORT_CODE { get; set; }

        [Column("ID#  4207")]
        public double? ID___4207 { get; set; }

        [Column("COMPANY NAME")]
        [StringLength(255)]
        public string COMPANY_NAME { get; set; }

        [StringLength(255)]
        public string CITY { get; set; }

        [StringLength(255)]
        public string STATE { get; set; }

        [StringLength(255)]
        public string SALES { get; set; }

        [StringLength(255)]
        public string PrimarySalesStaff { get; set; }

        [StringLength(255)]
        public string SecondarySalesStaff { get; set; }

        [StringLength(255)]
        public string MGR { get; set; }

        [StringLength(255)]
        public string AUDITOR { get; set; }

        [StringLength(255)]
        public string PrimaryAuditor { get; set; }

        [StringLength(255)]
        public string SecondaryAuditor { get; set; }

        [Column("GM REV")]
        public double? GM_REV { get; set; }

        [Column("ACCT REP")]
        [StringLength(255)]
        public string ACCT_REP { get; set; }

        public double? TERMS { get; set; }

        [StringLength(255)]
        public string PPMT { get; set; }

        public double? FUT { get; set; }

        [Column("CAN FEE")]
        public double? CAN_FEE { get; set; }

        [StringLength(255)]
        public string STATUS { get; set; }

        [Column("AR MEETING STATUS")]
        [StringLength(255)]
        public string AR_MEETING_STATUS { get; set; }

        [Column("CONFIRMED?")]
        [StringLength(255)]
        public string CONFIRMED_ { get; set; }

        [StringLength(255)]
        public string ASSIGNED { get; set; }

        [StringLength(255)]
        public string AIRFARE { get; set; }

        public DateTime? CONTRACT { get; set; }

        [StringLength(255)]
        public string AUDIT { get; set; }

        [Column("IN KERR")]
        public DateTime? IN_KERR { get; set; }

        public double? ESTIMATE { get; set; }

        public DateTime? COMPLETE { get; set; }

        [Column("RPT AMT")]
        public double? RPT_AMT { get; set; }

        [Column("LOA DATE")]
        public DateTime? LOA_DATE { get; set; }

        [Column("PAY DATE")]
        public DateTime? PAY_DATE { get; set; }

        [Column("PAY NOTES")]
        [StringLength(255)]
        public string PAY_NOTES { get; set; }

        public double? Field33 { get; set; }

        [StringLength(255)]
        public string Field34 { get; set; }

        [StringLength(255)]
        public string Field35 { get; set; }

        [StringLength(255)]
        public string Field36 { get; set; }

        [StringLength(255)]
        public string Field37 { get; set; }

        [Column("10/24/2008 0:00:00")]
        [StringLength(255)]
        public string C10_24_2008_0_00_00 { get; set; }

        [Column("10/31/2008 0:00:00")]
        [StringLength(255)]
        public string C10_31_2008_0_00_00 { get; set; }

        [Column("11/7/2008 0:00:00")]
        [StringLength(255)]
        public string C11_7_2008_0_00_00 { get; set; }

        [StringLength(255)]
        public string LATER { get; set; }

        [StringLength(255)]
        public string Field42 { get; set; }

        [StringLength(255)]
        public string Field43 { get; set; }

        [StringLength(255)]
        public string Field44 { get; set; }

        [StringLength(255)]
        public string Field45 { get; set; }

        [StringLength(255)]
        public string Field46 { get; set; }

        [StringLength(255)]
        public string Field47 { get; set; }

        [StringLength(255)]
        public string Field48 { get; set; }
    }
}
