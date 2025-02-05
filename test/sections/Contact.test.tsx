import { CONTACTS } from "@/content/contact.const";
import Contact from "@/sections/Contact";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Contact Component", () => {
  it("renders the contact section with title, subtitle, and paragraph", () => {
    const store = mockStore({
      content: {
        data: {
          others: {
            sections: { contact: "Contact Me" },
            contact: {
              title: "Let's Connect",
              paragraph:
                "Feel free to reach out via any of the platforms below.",
            },
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Contact />
      </Provider>
    );

    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    expect(screen.getByText("Contact Me")).toBeInTheDocument();
    expect(
      screen.getByText("Feel free to reach out via any of the platforms below.")
    ).toBeInTheDocument();
  });

  it("renders contact links", () => {
    const store = mockStore({
      content: {
        data: {
          others: {
            sections: { contact: "Contact Me" },
            contact: {
              title: "Let's Connect",
              paragraph:
                "Feel free to reach out via any of the platforms below.",
            },
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <Contact />
      </Provider>
    );

    CONTACTS.forEach((contact) => {
      expect(screen.findByText(contact.label)).toBeTruthy();
    });
  });
});
