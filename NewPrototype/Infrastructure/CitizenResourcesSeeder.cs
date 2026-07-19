using NewPrototype.Models;
using Piranha;
using Piranha.Extend.Blocks;
using Piranha.Models;

namespace NewPrototype.Infrastructure;

public static class CitizenResourcesSeeder
{
    /// <summary>
    /// Creates a starter Citizen Resources hierarchy without changing editor-owned pages.
    /// </summary>
    public static async Task EnsureCreatedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var api = scope.ServiceProvider.GetRequiredService<IApi>();
        var site = await api.Sites.GetDefaultAsync();

        if (site == null)
        {
            return;
        }

        const string sectionSlug = "citizen-resources";
        var section = await api.Pages.GetBySlugAsync<CitizenResource>(sectionSlug, site.Id);

        if (section == null)
        {
            // Never replace an editor-created page that already owns the intended address.
            var pageAtSlug = await api.Pages.GetBySlugAsync<PageInfo>(sectionSlug, site.Id);
            if (pageAtSlug != null)
            {
                return;
            }

            section = await CitizenResource.CreateAsync(api);
            section.Id = Guid.NewGuid();
            section.SiteId = site.Id;
            section.Title = "Citizen Resources";
            section.NavigationTitle = "Citizen Resources";
            section.Slug = sectionSlug;
            section.Excerpt = "Find Illinois State Police information, forms, safety resources, and public services in one place.";
            section.MetaTitle = "Citizen Resources — Illinois State Police";
            section.MetaDescription = "Illinois State Police information, forms, safety resources, and services for the public.";
            section.Published = DateTime.Now;

            await api.Pages.SaveAsync(section);
        }

        var starterPages = new[]
        {
            new StarterPage(
                "forms",
                "Forms",
                "Locate commonly requested Illinois State Police forms and submission information.",
                "This demonstration page is ready for editors to organize links to public forms and explain how each form should be submitted."),
            new StarterPage(
                "domestic-violence",
                "Domestic Violence Resources",
                "Find safety information and links to services for people affected by domestic violence.",
                "This demonstration page is ready for reviewed safety information, service contacts, and links to authoritative assistance."),
            new StarterPage(
                "scam-fraud",
                "Scam and Fraud Resources",
                "Learn about common scams, fraud prevention, and the appropriate place to report suspicious activity.",
                "This demonstration page is ready for current prevention guidance and links to the correct reporting organizations."),
            new StarterPage(
                "transparency",
                "Transparency",
                "Access public information, reports, policies, and Illinois State Police transparency resources.",
                "This demonstration page is ready for links to reports, policies, dashboards, public records, and other transparency materials.")
        };

        for (var sortOrder = 0; sortOrder < starterPages.Length; sortOrder++)
        {
            var starter = starterPages[sortOrder];
            var slug = $"{sectionSlug}/{starter.Slug}";
            var existing = await api.Pages.GetBySlugAsync<PageInfo>(slug, site.Id);
            if (existing != null)
            {
                continue;
            }

            var page = await CitizenResourcePage.CreateAsync(api);
            page.Id = Guid.NewGuid();
            page.SiteId = site.Id;
            page.ParentId = section.Id;
            page.SortOrder = sortOrder;
            page.Title = starter.Title;
            page.NavigationTitle = starter.Title;
            page.Slug = slug;
            page.Excerpt = starter.Excerpt;
            page.MetaTitle = $"{starter.Title} — Illinois State Police";
            page.MetaDescription = starter.Excerpt;
            page.Published = DateTime.Now;
            page.Blocks.Add(new HtmlBlock
            {
                Body = $"<h2>About this resource</h2><p>{starter.Body}</p>"
            });

            await api.Pages.SaveAsync(page);
        }
    }

    private sealed record StarterPage(string Slug, string Title, string Excerpt, string Body);
}
