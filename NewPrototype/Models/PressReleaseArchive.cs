using Piranha.AttributeBuilder;
using Piranha.Models;

namespace NewPrototype.Models;

[PageType(
    Title = "Press release archive",
    Description = "The public archive of Illinois State Police press releases.",
    IsArchive = true,
    UseBlocks = false,
    UseExcerpt = true,
    UsePrimaryImage = false)]
[PageTypeArchiveItem(typeof(PressRelease))]
[ContentTypeRoute(Title = "Press releases", Route = "/press-releases")]
public class PressReleaseArchive : Page<PressReleaseArchive>
{
    public PostArchive<PostInfo> Archive { get; set; }
}
