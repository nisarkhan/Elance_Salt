using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace SaltGroup.Infrastructure
{
    public static class HtmlHelperExtensions
    {
        public static MvcHtmlString LinkButton(this HtmlHelper htmlHelper, string text, string href, string clase, string glyph)
        {
            TagBuilder link = new TagBuilder("a");
            TagBuilder ico = new TagBuilder("span");
            ico.AddCssClass("glyphicon glyphicon-" + glyph);
            link.AddCssClass("btn btn-" + clase);
            link.Attributes.Add("href", href);
            link.InnerHtml = ico.ToString() + " " + text;

            return MvcHtmlString.Create(link.ToString());
        }

        public static MvcHtmlString SubmitButton(this HtmlHelper htmlHelper, string text, string clase, string glyph)
        {
            TagBuilder btn = new TagBuilder("button");
            TagBuilder ico = new TagBuilder("span");
            ico.AddCssClass("glyphicon glyphicon-" + glyph);
            btn.AddCssClass("btn btn-" + clase);
            btn.Attributes.Add("type", "submit");
            btn.InnerHtml = ico.ToString() + " " + text;

            return MvcHtmlString.Create(btn.ToString());
        }

        public static MvcHtmlString SaveBtn(this HtmlHelper htmlHelper)
        {
            return SubmitButton(htmlHelper, "Save", "success", "ok");
        }

        public static MvcHtmlString CancelBtn(this HtmlHelper htmlHelper, string href)
        {
            return LinkButton(htmlHelper, "Cancel", href, "default", "off");
        }

        public static MvcHtmlString TextBoxForKO<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            var dataBind = "value: " + GetProperty(expression, htmlHelper.ViewData);
            return htmlHelper.TextBoxFor(expression, new { @class = "form-control", data_bind = dataBind });
        }

        public static MvcHtmlString LabelForKO<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            return htmlHelper.LabelFor(expression, new { @class = "control-label col-md-4" });
        }

        public static MvcHtmlString TextStaticFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            var dataBind = "text: " + GetProperty(expression, htmlHelper.ViewData);
            TagBuilder span = new TagBuilder("span");
            span.Attributes.Add("data-bind", dataBind);

            return MvcHtmlString.Create(span.ToString());
        }

        public static MvcHtmlString TextStaticForGroup<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            return GroupControlShell(
                LabelForKO(htmlHelper, expression),
                TextStaticFor(htmlHelper, expression)
                );
        }

        public static MvcHtmlString TextBoxForGroup<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            return GroupControlShell(LabelForKO(htmlHelper, expression),
                        TextBoxForKO(htmlHelper, expression));
        }

        internal static string TextBoxControlsFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            return ControlShell(TextBoxForKO(htmlHelper, expression).ToString() + "\n"
                                + htmlHelper.ValidationMessageFor(expression).ToString());
        }

        public static MvcHtmlString GroupControlShell(MvcHtmlString label, MvcHtmlString controls)
        {
            TagBuilder group = new TagBuilder("div");
            group.AddCssClass("form-group");
            group.InnerHtml = label + "\n" + ControlShell(controls.ToString());

            return MvcHtmlString.Create(group.ToString());
        }

        internal static string ControlShell(string innerControl)
        {
            TagBuilder controls = new TagBuilder("div");
            controls.AddCssClass("col-md-8");

            controls.InnerHtml = innerControl;
            return controls.ToString();
        }

        internal static string GetProperty<TModel, TProperty>(Expression<Func<TModel, TProperty>> expression, ViewDataDictionary<TModel> viewData)
        {
            return ModelMetadata.FromLambdaExpression(expression, viewData).PropertyName;
        }

        internal static ModelMetadata GetMetadata<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, TProperty>> expression)
        {
            return ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);
        }

        internal static IDictionary<string, object> GetDictionary(object obj)
        {
            var dic = new Dictionary<string, object>();
            if (obj != null)
                foreach (var prop in obj.GetType().GetProperties())
                    dic.Add(prop.Name, prop.GetValue(obj));

            return dic;
        }
    }
}
