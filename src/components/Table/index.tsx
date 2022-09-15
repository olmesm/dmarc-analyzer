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

const SourceIpAsLink: React.FC<{ ip: string }> = ({ ip }) => {
  return (
    <a target="_blank" href={`https://whatismyipaddress.com/ip/${ip}`}>
      {ip}
    </a>
  );
};

export const Table: React.FC<Props> = ({ data }) => {
  const [headings, ...body] = createMatrixFromCollection(
    data
      .sort((a, b) => a.source_ip.localeCompare(b.source_ip))
      .map((i) => {
        if (i.source_ip) {
          return {
            ...i,
            source_ip: <SourceIpAsLink ip={i.source_ip as unknown as string} />,
          };
        }

        return i;
      }),
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
