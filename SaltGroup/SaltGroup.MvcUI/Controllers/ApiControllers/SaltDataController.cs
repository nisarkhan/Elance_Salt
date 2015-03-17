using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using Newtonsoft.Json.Linq;
using SaltGroup.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SaltGroup.MvcUI.Controllers.ApiControllers
{
    [BreezeController]
    public class SaltDataController : ApiController
    {
        readonly EFContextProvider<SaltDbContext> m_contextProvider
            = new EFContextProvider<SaltDbContext>();

        [HttpGet]
        public string Metadata()
        {
            return m_contextProvider.Metadata();
        }

        [HttpGet]
        [EnableBreezeQuery]
        public IQueryable<Clients> Clients()
        {
            return m_contextProvider.Context.Clients;
        }

        [HttpGet]
        [EnableBreezeQuery]
        public IQueryable<Vendors> Vendors()
        {
            return m_contextProvider.Context.Vendors;
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return m_contextProvider.SaveChanges(saveBundle);
        }
    }
}
