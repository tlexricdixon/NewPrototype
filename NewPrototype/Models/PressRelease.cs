using Piranha.AttributeBuilder;
using Piranha.Extend;
using Piranha.Extend.Fields;
using Piranha.Extend.Fields.Settings;
using Piranha.Models;

namespace NewPrototype.Models;

/// <summary>
/// An HTML-first news release authored and published by the Public Information Office.
/// </summary>
[PostType(
    Title = "Press release",
    Description = "An accessible, web-first Illinois State Police press release.",
    UseBlocks = false,
    UseExcerpt = true,
    UsePrimaryImage = true)]
[ContentTypeRoute(Title = "Press release", Route = "/press-release")]
public class PressRelease : Post<PressRelease>
{
    [Region(
        Title = "Release label",
        Description = "The short label displayed above the headline.",
        SortOrder = 10)]
    [StringFieldSettings(DefaultValue = "FOR IMMEDIATE RELEASE", MaxLength = 80)]
    public StringField ReleaseLabel { get; set; }

    [Region(
        Title = "Dateline",
        Description = "The city or location at the beginning of the release, for example ROCKFORD.",
        SortOrder = 20)]
    [StringFieldSettings(MaxLength = 120)]
    public StringField Dateline { get; set; }

    [Region(
        Title = "Release body",
        Description = "Paste the release text here. Use Heading 2 for section headings; the release title is already Heading 1.",
        SortOrder = 30)]
    public HtmlField Body { get; set; }

    [Region(
        Title = "Legal notice",
        Description = "Optional notice, such as the presumption-of-innocence statement.",
        SortOrder = 40)]
    public TextField LegalNotice { get; set; }

    [Region(
        Title = "PIO contact",
        Description = "Contact information displayed with the release.",
        SortOrder = 50)]
    public PressContact Contact { get; set; }

    public class PressContact
    {
        [Field(Title = "Contact name", SortOrder = 10)]
        [StringFieldSettings(DefaultValue = "ISP Public Information Office", MaxLength = 160)]
        public StringField Name { get; set; }

        [Field(Title = "Phone", SortOrder = 20)]
        [StringFieldSettings(DefaultValue = "(217) 524-2500", MaxLength = 40)]
        public StringField Phone { get; set; }

        [Field(Title = "Email", SortOrder = 30)]
        [StringFieldSettings(DefaultValue = "ISP.PIO.Personnel@illinois.gov", MaxLength = 200)]
        public StringField Email { get; set; }

        [Field(Title = "TDD", SortOrder = 40)]
        [StringFieldSettings(MaxLength = 40)]
        public StringField Tdd { get; set; }
    }
}
