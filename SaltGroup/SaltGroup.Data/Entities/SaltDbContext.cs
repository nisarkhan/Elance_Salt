namespace SaltGroup.Data.Entities
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class SaltDbContext : DbContext
    {
        public SaltDbContext()
            : base("name=Salt")
        {
        }

        public virtual DbSet<CallLog> CallLog { get; set; }
        public virtual DbSet<Clients> Clients { get; set; }
        public virtual DbSet<CollectionsRefundEntry> CollectionsRefundEntry { get; set; }
        public virtual DbSet<CreditInterestReveived> CreditInterestReveived { get; set; }
        public virtual DbSet<CustomerPaymentsEntry> CustomerPaymentsEntry { get; set; }
        public virtual DbSet<FutureBenefitsEntry> FutureBenefitsEntry { get; set; }
        public virtual DbSet<MenuAssigned> MenuAssigned { get; set; }
        public virtual DbSet<MenuCollectionNote> MenuCollectionNote { get; set; }
        public virtual DbSet<MenuContractConfirm> MenuContractConfirm { get; set; }
        public virtual DbSet<MenuContractStatus> MenuContractStatus { get; set; }
        public virtual DbSet<MenuContractTypes> MenuContractTypes { get; set; }
        public virtual DbSet<MenuPaymentTerms> MenuPaymentTerms { get; set; }
        public virtual DbSet<MenuPayNotes> MenuPayNotes { get; set; }
        public virtual DbSet<MenuRecoveryType> MenuRecoveryType { get; set; }
        public virtual DbSet<MenuUSStates> MenuUSStates { get; set; }
        public virtual DbSet<ProgressPayments> ProgressPayments { get; set; }
        public virtual DbSet<RefundEntry> RefundEntry { get; set; }
        public virtual DbSet<StateRefundEntry> StateRefundEntry { get; set; }
        public virtual DbSet<TrackLog> TrackLog { get; set; }
        public virtual DbSet<TrackVendor> TrackVendor { get; set; }
        public virtual DbSet<VendorLog> VendorLog { get; set; }
        public virtual DbSet<Vendors> Vendors { get; set; }
        public virtual DbSet<WorkWeb> WorkWeb { get; set; }
        public virtual DbSet<CurrentJobs> CurrentJobs { get; set; }
        public virtual DbSet<MenuCollectionType> MenuCollectionType { get; set; }
        public virtual DbSet<MultiTaxID> MultiTaxID { get; set; }
        public virtual DbSet<Track> Track { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Clients>()
                .Property(e => e.AmountofDiscount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Clients>()
                .Property(e => e.EstimateDollarAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Clients>()
                .Property(e => e.CalculatedAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Clients>()
                .Property(e => e.FinalReportAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Clients>()
                .Property(e => e.NonRefundAdvance)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Clients>()
                .Property(e => e.NonRefundContract)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Clients>()
                .Property(e => e.NonRefundPrePay)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Clients>()
                .Property(e => e.NonRefundFuture)
                .HasPrecision(19, 4);

            modelBuilder.Entity<CollectionsRefundEntry>()
                .Property(e => e.AmountReceived)
                .HasPrecision(19, 4);

            modelBuilder.Entity<CreditInterestReveived>()
                .Property(e => e.Number)
                .IsUnicode(false);

            modelBuilder.Entity<CustomerPaymentsEntry>()
                .Property(e => e.PrepayAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<CustomerPaymentsEntry>()
                .Property(e => e.PrepayCredit)
                .HasPrecision(19, 4);

            modelBuilder.Entity<CustomerPaymentsEntry>()
                .Property(e => e.PrepayBalance)
                .HasPrecision(19, 4);

            modelBuilder.Entity<CustomerPaymentsEntry>()
                .Property(e => e.AppliedBalance)
                .HasPrecision(19, 4);

            modelBuilder.Entity<FutureBenefitsEntry>()
                .Property(e => e.OriginalAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<FutureBenefitsEntry>()
                .Property(e => e.Adjusted)
                .HasPrecision(19, 4);

            modelBuilder.Entity<FutureBenefitsEntry>()
                .Property(e => e.AmountRecovered)
                .HasPrecision(19, 4);

            modelBuilder.Entity<MenuCollectionNote>()
                .Property(e => e.CollectionNoteName)
                .IsFixedLength();

            modelBuilder.Entity<MenuPaymentTerms>()
                .Property(e => e.Calculation)
                .IsFixedLength();

            modelBuilder.Entity<ProgressPayments>()
                .Property(e => e.ProgressPayment)
                .HasPrecision(19, 4);

            modelBuilder.Entity<RefundEntry>()
                .Property(e => e.AmountIdentified)
                .HasPrecision(19, 4);

            modelBuilder.Entity<RefundEntry>()
                .Property(e => e.Adjusted)
                .HasPrecision(19, 4);

            modelBuilder.Entity<RefundEntry>()
                .Property(e => e.AmountRecovered)
                .HasPrecision(19, 4);

            modelBuilder.Entity<RefundEntry>()
                .Property(e => e.BatchNumber)
                .IsFixedLength();

            modelBuilder.Entity<RefundEntry>()
                .Property(e => e.LeftToRecover)
                .HasPrecision(19, 4);

            modelBuilder.Entity<StateRefundEntry>()
                .Property(e => e.AmountSubmitted)
                .HasPrecision(19, 4);

            modelBuilder.Entity<StateRefundEntry>()
                .Property(e => e.AmountPaid)
                .HasPrecision(19, 4);

            modelBuilder.Entity<StateRefundEntry>()
                .Property(e => e.DeniedAdjusted)
                .HasPrecision(19, 4);

            modelBuilder.Entity<StateRefundEntry>()
                .Property(e => e.BalanceState)
                .HasPrecision(19, 4);

            modelBuilder.Entity<TrackLog>()
                .Property(e => e.Notes)
                .IsUnicode(false);

            modelBuilder.Entity<TrackVendor>()
                .Property(e => e.VendorName)
                .IsUnicode(false);

            modelBuilder.Entity<TrackVendor>()
                .Property(e => e.StateAuditor)
                .IsUnicode(false);

            modelBuilder.Entity<TrackVendor>()
                .Property(e => e.Phonenumber)
                .IsUnicode(false);

            modelBuilder.Entity<TrackVendor>()
                .Property(e => e.Extension)
                .IsUnicode(false);

            modelBuilder.Entity<TrackVendor>()
                .Property(e => e.Location)
                .IsUnicode(false);

            modelBuilder.Entity<TrackVendor>()
                .Property(e => e.Status)
                .IsUnicode(false);

            modelBuilder.Entity<VendorLog>()
                .Property(e => e.VendorNotes)
                .IsUnicode(false);

            modelBuilder.Entity<Vendors>()
                .Property(e => e.VendorCode)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.CompanyLegalName)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.DBA)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.MrMs)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.ContactFirstName)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.ContactLastName)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.ContactTitle)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.PhoneNumber)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.Extension)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.FaxNumber)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.EmailAddress)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.Address)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.City)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.Zip)
                .IsFixedLength();

            modelBuilder.Entity<Vendors>()
                .Property(e => e.ClientLocation)
                .IsFixedLength();

            modelBuilder.Entity<MenuCollectionType>()
                .Property(e => e.CollectionType)
                .IsFixedLength();

            modelBuilder.Entity<MultiTaxID>()
                .Property(e => e.CustomerID)
                .IsFixedLength();

            modelBuilder.Entity<MultiTaxID>()
                .Property(e => e.MultiTax)
                .IsFixedLength();
        }
    }
}
