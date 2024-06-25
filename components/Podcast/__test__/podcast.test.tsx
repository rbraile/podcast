import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { podcastMock } from "@/mocks";
import Podcast, { PodcastProps } from "@/components/Podcast";

describe("Podcast", () => {
  let props: PodcastProps = {
    title: podcastMock.title.label,
    podcastId: podcastMock.id.attributes["im:id"],
    src: podcastMock["im:image"][1].label,
    alt: podcastMock["im:name"].label,
    author: podcastMock["im:artist"].label,
  };

  it("render Podcast component with the correct data", () => {
    const { getByAltText, getByText } = render(<Podcast {...props} />);
    const image = getByAltText(podcastMock["im:name"].label);
    const author = `Author: ${podcastMock["im:artist"].label}`;
    const title = podcastMock.title.label.split("-")[0].trim();

    expect(image).toHaveAttribute("src", podcastMock["im:image"][1].label);
    expect(getByText(author)).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
  });
});
