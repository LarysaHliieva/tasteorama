import { Outlet } from "react-router-dom";

export default function Loyout() {
  return (
    <>
      Header
      <Outlet />
      Footer
    </>
  );
}
