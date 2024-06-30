import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { podcastMock } from "@/mocks";
import Podcast, { PodcastProps } from "@/components/Podcast";

describe("Podcast", () => {
  const props: PodcastProps = {
    title: podcastMock.title.label,
    podcastId: podcastMock.id.attributes["im:id"],
    src: podcastMock["im:image"][1].label,
    alt: podcastMock["im:name"].label,
    author: podcastMock["im:artist"].label,
  };

  it("render Podcast component with the correct data", () => {
    const { getByAltText, getByText } = render(<Podcast {...props} />);
    const image = getByAltText(podcastMock["im:name"].label);
    const author = `By: ${podcastMock["im:artist"].label}`;
    const title = podcastMock.title.label;

    expect(image).toHaveAttribute("src", podcastMock["im:image"][1].label);
    expect(getByText(author)).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
  });

  it("render Podcast component in the podcast details", () => {
    const newProps = {
      ...props,
      description: podcastMock.summary.label,
      type: "podcastItem",
    };
    const { getByAltText, getByText } = render(<Podcast {...newProps} />);
    const image = getByAltText(podcastMock["im:name"].label);
    const author = `By: ${podcastMock["im:artist"].label}`;
    const title = podcastMock.title.label;

    expect(image).toHaveAttribute("src", podcastMock["im:image"][1].label);
    expect(getByText(author)).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText("description of the podcast")).toBeInTheDocument();
  });

  it("render Podcast component checks that handleSelectPodcast is colled", async () => {
    const handleSelectPodcast = jest.fn();
    const newProps = {
      ...props,
      handleSelectPodcast,
    };
    const { getByAltText } = render(<Podcast {...newProps} />);
    const image = getByAltText(podcastMock["im:name"].label);
    await fireEvent.click(image);
    expect(handleSelectPodcast).toHaveBeenCalledWith(
      podcastMock.id.attributes["im:id"]
    );
  });
});
