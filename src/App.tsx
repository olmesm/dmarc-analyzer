import { useState } from "react";
import X2JS from "x2js";
import { getMetaData, getPolicy, getRecords } from "./utils/dmarc-parse";

import { Table } from "./components/Table";
import { Modal } from "./components/Modal";
import { Accordion } from "./components/Accordion";
import { Header } from "./components/Header";

const x2js = new X2JS();

const somewhatPretty = (blob: any) => JSON.stringify(blob, null, 2);

export function App() {
  const [blob, setBlob] = useState<Blob>();
  const [modalBody, setModalBody] = useState("");

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
  };

  const changeHandler = (event: any): void => {
    event.target.files[0]
      ?.text()
      .then((t: string) => x2js.xml2js(t))
      .then(setBlob)
      .catch((e: Error) => {
        console.error(e);

        setModalBody("Error parsing file");
      });
  };

  return (
    <main className="container-fluid">
      <Header />

      <Modal body={modalBody} setBody={setModalBody} />

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          accept="text/xml"
          onChange={changeHandler}
        />
      </form>

      {blob && (
        <div>
          <Table data={getRecords(blob)} />
          <hr />

          <article>
            <Accordion
              title={"Metadata"}
              body={somewhatPretty(getMetaData(blob))}
              copyCallback={setModalBody}
            />
            <Accordion
              title={"Policy"}
              body={somewhatPretty(getPolicy(blob))}
              copyCallback={setModalBody}
            />
            <Accordion
              title={"Records"}
              body={somewhatPretty(getRecords(blob))}
              copyCallback={setModalBody}
            />
            <Accordion
              title={"Full"}
              body={somewhatPretty(blob)}
              copyCallback={setModalBody}
            />
          </article>
        </div>
      )}
    </main>
  );
}
