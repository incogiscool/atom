import { MDXRemote } from "next-mdx-remote/rsc";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

export const AtomBody = async ({
  className,
  body,
}: {
  className?: string;
  body: string;
}) => {
  const sanitized = sanitizeHtml(body);
  const parsed = await marked(sanitized);

  return (
    <div className={className}>
      <MDXRemote
        // components={{
        //   h1: (props) => (
        //     <h1 {...props} className="text-4xl font-bold">
        //       {props.children}
        //     </h1>
        //   ),
        //   h2: (props) => (
        //     <h2 {...props} className="text-3xl font-bold">
        //       {props.children}
        //     </h2>
        //   ),
        //   h3: (props) => (
        //     <h3 {...props} className="text-2xl font-semibold">
        //       {props.children}
        //     </h3>
        //   ),
        //   h4: (props) => (
        //     <h3 {...props} className="text-xl font-semibold">
        //       {props.children}
        //     </h3>
        //   ),
        //   h5: (props) => (
        //     <h3 {...props} className="text-lg font-semibold">
        //       {props.children}
        //     </h3>
        //   ),
        //   h6: (props) => (
        //     <h3 {...props} className="text-sm font-semibold">
        //       {props.children}
        //     </h3>
        //   ),
        //   a: (props) => (
        //     <a {...props} className="text-blue-600 underline">
        //       {props.children}
        //     </a>
        //   ),
        // }}
        source={parsed || "no text"}
      />
    </div>
  );
};
