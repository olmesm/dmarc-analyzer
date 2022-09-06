import { useState } from "react";
import X2JS from "x2js";
import { Table } from "./components/Table";
import { getMetaData, getPolicy, getRecords } from "./utils/dmarc-parse";
import copy from "copy-text-to-clipboard";

const x2js = new X2JS();

const handleCopy = (body: string) => () => {
  copy(body);
};

const Accordion: React.FC<{ title: string; body: string }> = ({
  title,
  body,
}) => (
  <details>
    <summary className="outline" role="button">
      {title}
    </summary>
    <code
      onClick={handleCopy(body)}
      className="wrap pointer"
      data-tooltip="Copy to clipboard"
    >
      {body}
    </code>
  </details>
);

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
        <Table data={getRecords(blob)} />

        {blob && (
          <>
            <Accordion
              title={"Metadata"}
              body={JSON.stringify(getMetaData(blob))}
            />
            <Accordion
              title={"Policy"}
              body={JSON.stringify(getPolicy(blob))}
            />
            <Accordion
              title={"Records"}
              body={JSON.stringify(getRecords(blob))}
            />
            <Accordion title={"Full"} body={JSON.stringify(blob)} />
          </>
        )}
      </div>
    </main>
  );
}
