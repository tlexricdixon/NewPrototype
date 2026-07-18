using NewPrototype.Models;
using Piranha;

namespace NewPrototype.Infrastructure;

public static class PressReleaseArchiveSeeder
{
    /// <summary>
    /// Creates the public press-release archive once, without changing an existing page.
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

        var archive = await api.Pages.GetBySlugAsync<PressReleaseArchive>("news", site.Id);
        if (archive == null)
        {
            archive = await PressReleaseArchive.CreateAsync(api);
            archive.Id = Guid.NewGuid();
            archive.SiteId = site.Id;
            archive.Title = "Press Releases";
            archive.NavigationTitle = "News";
            archive.Slug = "news";
            archive.MetaTitle = "Press Releases — Illinois State Police";
            archive.MetaDescription = "Official news and press releases from the Illinois State Police Public Information Office.";
            archive.Published = DateTime.Now;

            await api.Pages.SaveAsync(archive);
        }

        await EnsureDemoPressReleasesAsync(api, archive.Id);
    }

    private static async Task EnsureDemoPressReleasesAsync(IApi api, Guid archiveId)
    {
        var releases = new[]
        {
            new DemoRelease(
                "demo-new-troopers-graduate",
                "DEMO — New Troopers Graduate and Begin Serving Illinois Communities",
                "A DEMO class of new troopers completed comprehensive training focused on public service, de-escalation, and roadway safety.",
                "SPRINGFIELD",
                "<p><strong>DEMO CONTENT — NOT AN ACTUAL PRESS RELEASE.</strong></p><p>A demonstration class of Illinois State Police troopers has completed academy training and is beginning field assignments across the state.</p><p>The demonstration training emphasized constitutional policing, de-escalation, emergency medical response, roadway safety, and respectful community engagement.</p><p>This good-news example shows how the Public Information Office can publish a complete, readable web release without creating a PDF.</p>"),
            new DemoRelease(
                "demo-k9-team-recognized",
                "DEMO — ISP K-9 Team Recognized for Successful Community Search",
                "A DEMO ISP K-9 team is recognized for safely locating a missing community member and assisting local first responders.",
                "DECATUR",
                "<p><strong>DEMO CONTENT — NOT AN ACTUAL PRESS RELEASE.</strong></p><p>An Illinois State Police K-9 team is being recognized in this demonstration story after supporting local agencies during a community search.</p><p>The fictional team worked alongside dispatchers, firefighters, emergency medical personnel, and volunteers to bring the search to a safe conclusion.</p><p>This release is sample content created only to demonstrate the new accessible publishing workflow.</p>"),
            new DemoRelease(
                "demo-forensic-service-improvements",
                "DEMO — Forensic Service Improvements Deliver Faster Support to Agencies",
                "DEMO process improvements help participating law-enforcement agencies receive clearer updates and faster forensic-service support.",
                "CHICAGO",
                "<p><strong>DEMO CONTENT — NOT AN ACTUAL PRESS RELEASE.</strong></p><p>The Illinois State Police is demonstrating how a positive operational update could be shared through accessible HTML.</p><p>In this fictional example, updated laboratory workflows, clearer status notifications, and stronger coordination help local agencies receive timely forensic support.</p><p>The figures and events in this demonstration are not real and are included solely for homepage and news-template review.</p>"),
            new DemoRelease(
                "demo-community-safety-partnership",
                "DEMO — Community Safety Partnership Expands Youth Outreach",
                "A DEMO partnership brings additional safety education, mentoring, and career exploration to young people across Illinois.",
                "EAST ST. LOUIS",
                "<p><strong>DEMO CONTENT — NOT AN ACTUAL PRESS RELEASE.</strong></p><p>A fictional community partnership is expanding youth outreach through safety education, mentoring, and public-service career exploration.</p><p>The demonstration program connects troopers, educators, families, and community organizations through hands-on events designed to build trust and encourage positive relationships.</p><p>This sample illustrates how good news can be published quickly, read comfortably on a phone, and understood without downloading a document.</p>")
        };

        for (var index = 0; index < releases.Length; index++)
        {
            var release = releases[index];
            var existing = await api.Posts.GetBySlugAsync<PressRelease>(archiveId, release.Slug);
            if (existing != null)
            {
                continue;
            }

            var post = await PressRelease.CreateAsync(api);
            post.Id = Guid.NewGuid();
            post.BlogId = archiveId;
            post.Title = release.Title;
            post.Slug = release.Slug;
            post.Excerpt = release.Excerpt;
            post.MetaDescription = release.Excerpt;
            post.Category = "DEMO Good News";
            post.ReleaseLabel = "DEMO PRESS RELEASE — DEMONSTRATION ONLY";
            post.Dateline = release.Dateline;
            post.Body = release.Body;
            post.Published = DateTime.Now.AddDays(-index);

            post.Contact ??= new PressRelease.PressContact();
            post.Contact.Name = "DEMO ISP Public Information Office";
            post.Contact.Phone = "DEMO — (217) 524-2500";
            post.Contact.Email = "ISP.PIO.Personnel@illinois.gov";

            await api.Posts.SaveAsync(post);
        }
    }

    private sealed record DemoRelease(
        string Slug,
        string Title,
        string Excerpt,
        string Dateline,
        string Body);
}
