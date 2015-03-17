using SaltGroup.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SaltGroup.MvcUI.Controllers
{
    public class TemplatesController : Controller
    {
        public PartialViewResult Clients(string form)
        {
            switch (form)
            {
                case "edit":
                case "insert":
                    return PartialView("EditorEntityPartial", new Clients());

                case "display":
                    return PartialView("DisplayEntityPartial", new Clients());
            }
            throw new HttpException(404, "No se encuentra la plantilla solicitada.");
        }

        public PartialViewResult Vendors(string form)
        {
            switch (form)
            {
                case "edit":
                case "insert":
                    return PartialView("EditorEntityPartial", new Vendors());

                case "display":
                    return PartialView("DisplayEntityPartial", new Vendors());
            }
            throw new HttpException(404, "No se encuentra la plantilla solicitada.");
        }

        public PartialViewResult Tracking(string form)
        {
            switch (form)
            {
                case "edit":
                case "insert":
                    return PartialView("EditorEntityPartial", new Clients());

                case "display":
                    return PartialView("DisplayEntityPartial", new Clients());
            }
            throw new HttpException(404, "No se encuentra la plantilla solicitada.");
        }

        public PartialViewResult Forms(string form)
        {
            string partialView = "forms-" + form + "-tmpl";
            return PartialView(partialView);
        }

        public PartialViewResult Buttons(string form)
        {
            string partialView = "buttons-" + form + "-tmpl";
            return PartialView(partialView);
        }

        public PartialViewResult Entity(string form)
        {
            string partialView = "entity-" + form + "-tmpl";
            return PartialView(partialView);
        }
    }
}
