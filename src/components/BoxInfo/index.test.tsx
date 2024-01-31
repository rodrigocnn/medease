import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import "@testing-library/jest-dom";

import { BoxInfo } from "./index";
import { FaUserMd } from "react-icons/fa";

it("Should render correctly", () => {
  render( <BoxInfo title="Profissionais" number="10" color="bg-blue-400">
          <FaUserMd />
        </BoxInfo>);
  expect(screen.getByText("Profissionais")).toBeInTheDocument();
});
