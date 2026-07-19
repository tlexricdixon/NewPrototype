using Piranha.AttributeBuilder;
using Piranha.Models;

namespace NewPrototype.Models;


[PageType(
    Title = "Citizen Resources section",
    Description = "Landing page for the public Citizen Resources section.",
    UseBlocks = true,
    UseExcerpt = true,
    UsePrimaryImage = false)]
[ContentTypeRoute(Title = "Citizen Resources", Route = "/citizen-resources")]
public class CitizenResource : Page<CitizenResource>
{
    /// <summary>
    /// Published child pages displayed by the section landing page.
    /// This is populated at request time and is not editor-managed content.
    /// </summary>
    public IList<PageInfo> Children { get; set; } = new List<PageInfo>();
}
