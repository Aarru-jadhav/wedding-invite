import { useState } from "react";

import Loader from "./section/Loader";
import Hero from "./section/Hero";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <Loader
          onComplete={() => {
            setLoading(false);
          }}
        />
      )}

      {!loading && <Hero />}
    </>
  );
}

export default App;