import MDEditor, { ContextStore } from "@uiw/react-md-editor";
import { ChangeEvent } from "react";
import rehypeSanitize from "rehype-sanitize";

export const MarkdownEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange:
    | ((
        value?: string | undefined,
        event?: ChangeEvent<HTMLTextAreaElement> | undefined,
        state?: ContextStore | undefined
      ) => void)
    | undefined;
}) => {
  return (
    <MDEditor
      value={value}
      onChange={onChange}
      className="rounded-lg"
      data-color-mode="light"
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
      height={300}
      //   onUploadImg={(files) => {
      //     console.log(files);
      //   }}
    />
  );
};
