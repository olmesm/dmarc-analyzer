import title from "title";
import { isOccupied, uniqueArray } from "../../utils/immutable-array";

type CollectionType = Record<string, any>;

const HEADER_PRIORITY = [
  "source_ip",
  "header_from",
  "count",
  "spf_result",
  "spf",
  "spf_domain",
  "dkim_result",
  "dkim",
  "dkim_domain",
];

export const createMatrixFromCollection = <T extends CollectionType>(
  collection: T[],
  headings: string[] = [],
  isOnlyKnownHeadings: boolean = false
): any[][] => {
  const matrixHeadings =
    isOnlyKnownHeadings && isOccupied(headings)
      ? headings
      : uniqueArray(headings.concat(collection.flatMap(Object.keys)));

  return [
    matrixHeadings,
    ...collection.map((o) => matrixHeadings.map((h) => o[h])),
  ];
};

type Props = {
  data: CollectionType[];
};

export const Table: React.FC<Props> = ({ data }) => {
  const [headings, ...body] = createMatrixFromCollection(
    data.sort((a, b) => a.source_ip.localeCompare(b.source_ip)),
    HEADER_PRIORITY
  );

  return (
    <>
      <table className="small-font">
        <thead>
          <tr>
            {headings
              .map((t) => title(t.replace("_", " ")))
              .map((h) => (
                <th className="small-font small-padding" key={h}>
                  {h}
                </th>
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
