using Piranha.AttributeBuilder;
using Piranha.Models;

namespace NewPrototype.Models;

[PageType(
    Title = "Citizen Resource page",
    Description = "A reusable content page that belongs beneath the Citizen Resources section.",
    UseBlocks = true,
    UseExcerpt = true,
    UsePrimaryImage = true)]
[ContentTypeRoute(Title = "Citizen Resource page", Route = "/citizen-resource")]
public class CitizenResourcePage : Page<CitizenResourcePage>
{
}
