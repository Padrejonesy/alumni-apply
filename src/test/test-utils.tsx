import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";

type RouterOptions = {
  route?: string;
  path?: string;
};

export function renderWithRouter(ui: React.ReactElement, options: RouterOptions = {}) {
  const { route = "/", path = "*" } = options;

  return render(
    <TooltipProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={path} element={ui} />
        </Routes>
      </MemoryRouter>
    </TooltipProvider>
  );
}
