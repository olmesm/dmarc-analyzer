import { SITE_TITLE } from "../config";

export const Modal: React.FC<{
  setBody: (...s: any) => void;
  body: string | false;
  title?: string;
}> = ({ body, setBody, title = SITE_TITLE }) => (
  <dialog open={!!body}>
    <article>
      <header>
        <button
          aria-label="Close"
          className="close outline"
          onClick={() => setBody(false)}
        />
        {title}
      </header>
      <p>{body}</p>
    </article>
  </dialog>
);
