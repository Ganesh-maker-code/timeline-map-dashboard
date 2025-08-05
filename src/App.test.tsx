import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom"; // Import jest-dom matchers

test("renders map dashboard", () => {
  render(<App />);
  const linkElement = screen.getByText(/map dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
