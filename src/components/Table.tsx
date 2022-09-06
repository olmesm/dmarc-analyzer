import title from "title";

export const createMatrixFromCollection = <T extends Record<string, any>>(
  collection: T[],
  headings?: string[]
): any[][] => {
  const matrixHeadings = headings || [
    ...new Set(collection.flatMap(Object.keys)),
  ];

  return [
    matrixHeadings,
    ...collection.map((o) => matrixHeadings.map((h) => o[h])),
  ];
};

type Props = {
  data: Record<string, any>[];
};

export const Table: React.FC<Props> = ({ data }) => {
  const [headings, ...body] = createMatrixFromCollection(data);

  return (
    <>
      <table>
        <thead>
          <tr>
            {headings
              .map((t) => title(t.replace("_", " ")))
              .map((h) => (
                <th key={h}>{h}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {body.map((b) => (
            <tr key={b.join()}>
              {b.map((d, i) => (
                <td key={i}>{d}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
