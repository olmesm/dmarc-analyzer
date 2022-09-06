import copy from "copy-text-to-clipboard";

const handleCopy = (body: string, copyCallback?: (...s: any) => void) => () => {
  copy(body);

  if (copyCallback) {
    copyCallback();
  }
};

export const Accordion: React.FC<{
  title: string;
  body: string;
  copyCallback?: (...s: any) => void;
}> = ({ title, body, copyCallback }) => (
  <details>
    <summary className="outline" role="button">
      {title}
    </summary>

    <code
      onClick={handleCopy(
        body,
        copyCallback ? () => copyCallback("Copied to clipboard") : undefined
      )}
      className="wrap pointer"
      data-tooltip="Copy to clipboard"
    >
      {body}
    </code>
  </details>
);
