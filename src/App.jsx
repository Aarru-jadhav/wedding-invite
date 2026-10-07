import { useState } from "react";

import Loader from "./sections/Loader";
import Hero from "./sections/Hero";

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