import AppBullet from "@/components/AppBullet";
import { render, screen } from "@testing-library/react";
import DOMPurify from "dompurify";

vi.mock("dompurify", () => ({
  default: { sanitize: vi.fn((text) => text) },
}));

describe("AppBullet Component", () => {
  it("renders the bullet text", () => {
    render(<AppBullet bulletText="Test Bullet" />);
    expect(screen.getByText("Test Bullet")).toBeInTheDocument();
  });

  it("sanitizes the bullet text", () => {
    render(<AppBullet bulletText="<script>alert('xss')</script>Safe Text" />);
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(
      "<script>alert('xss')</script>Safe Text"
    );
  });

  it("renders HTML safely", () => {
    render(<AppBullet bulletText="<strong>Bold Text</strong>" />);
    expect(screen.getByText("Bold Text")).toBeInTheDocument();
  });
});
