import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/courses")({
  component: () => (
    <div className="pt-20">
      <Outlet />
    </div>
  ),
});
