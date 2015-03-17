using SaltGroup.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SaltGroup.MvcUI.App_Start
{
    [Authorize]
    public class VendorsController : Controller
    {
        // GET: Vendors
        public ActionResult Index()
        {
            ViewBag.Title = "Vendors";
            return View(new Vendors());
        }
    }
}

