import { useState } from "react";
import X2JS from "x2js";

const x2js = new X2JS();

export function App() {
  const [blob, setBlob] = useState<Blob>();

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
  };

  const changeHandler = (event: any): void => {
    event.target.files[0]
      ?.text()
      .then((t: string) => x2js.xml2js(t))
      .then(setBlob);
  };

  return (
    <main className="container-fluid">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          accept="text/xml"
          onChange={changeHandler}
        />
      </form>

      <div>
        <code>JSON: {JSON.stringify(blob)}</code>
      </div>
    </main>
  );
}
