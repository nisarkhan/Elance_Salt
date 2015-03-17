using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SaltGroup.MvcUI.Controllers
{
    [Authorize]
    public class TrackingController : Controller
    {
        // GET: Tracking
        public ActionResult Index()
        {
            ViewBag.Title = "Job tracking";
            return View();
        }
    }
}