import { Outlet } from "react-router-dom";
import { DialogProvider } from "./providers/DialogProvider";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
