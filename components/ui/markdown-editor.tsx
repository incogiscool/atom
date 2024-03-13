import { ChangeEvent, MdEditor, ToolbarNames } from "md-editor-rt";
import "md-editor-rt/lib/preview.css";

export const MarkdownEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEvent;
}) => {
  const toolbar: ToolbarNames[] = [
    "revoke",
    "next",
    "save",
    "-",
    "bold",
    "underline",
    "italic",
    "-",
    "strikeThrough",
    "title",
    "sub",
    "sup",
    "quote",
    "unorderedList",
    "orderedList",
    "task", // ^2.4.0
    "-",
    "codeRow",
    "code",
    "link",
    // No image support FOR NOW
    // "image",
    "table",
    "mermaid",
    "katex",
    "=",
    "pageFullscreen",
    "fullscreen",
    "preview",
    "htmlPreview",
    "github",
  ];

  return (
    <MdEditor
      modelValue={value}
      onChange={onChange}
      language="en-US"
      className="rounded-lg"
      toolbars={toolbar}
      //   onUploadImg={(files) => {
      //     console.log(files);
      //   }}
    />
  );
};
