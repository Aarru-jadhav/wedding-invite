import { useState } from "react";

import Loader from "./Sections/Loader";
import Hero from "./Sections/Hero";

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