import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import { BottomBar } from "./components/BottomBar";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Nav />
          <Suspense>{props.children}</Suspense>
          <BottomBar />
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
