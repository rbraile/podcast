import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { podcastListMock } from "@/mocks";
import List, { ListProps } from "@/components/List";

describe("Podcast", () => {
  const props: ListProps = {
    title: "title list mock",
    list: podcastListMock as [],
    handleSelectPodcast: jest.fn(),
    testId: "",
  };

  it("render PodcastList component with 3 items", () => {
    const { getAllByRole } = render(<List {...props} />);

    const items = getAllByRole("listitem");
    expect(items.length).toBe(podcastListMock.length);
  });

  it("render the correct title", () => {
    const { getByText } = render(<List {...props} />);
    expect(getByText("title list mock")).toBeTruthy();
  });
});
