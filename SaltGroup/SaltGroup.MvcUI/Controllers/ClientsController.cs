using SaltGroup.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SaltGroup.MvcUI.Controllers
{
    [Authorize]
    public class ClientsController : Controller
    {
        // GET: Clients
        public ActionResult Index()
        {
            ViewBag.Title = "Clients";
            ViewBag.Urlhash = "clients";
            return View(new Clients());
        }

        public ActionResult Search()
        {
            ViewBag.Urlhash = "clients/search";
            return View("index");
        }

        public ActionResult Insert()
        {
            ViewBag.Urlhash = "clients/insert";
            return View("index", new Clients());
        }

        public ActionResult Display(int id)
        {
            ViewBag.Urlhash = "clients/display/" + id.ToString();
            return View("index", new Clients());
        }

        public ActionResult Edit(int id)
        {
            ViewBag.Urlhash = "clients/edit/" + id.ToString();
            return View("index", new Clients());
        }
    }
}

