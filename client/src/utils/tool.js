import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import SimpleImage from "@editorjs/simple-image";

const initializeEditor = () => {
  const editorConfig = new EditorJS({
    holder: "editorjs",
    tools: {
      header: Header,
      linkTool: {
        class: LinkTool,
        config: {
          endpoint: "http://localhost:8008/fetchUrl", // Your backend endpoint for url data fetching,
        },
      },
      list: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: "unordered",
        },
      },
      image: {
        class: ImageTool,
        config: {
          endpoints: {
            byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
            byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
          },
        },
      },
      simpleImage: SimpleImage,
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
    },
    // autofocus: true,
    placeholder: "Let`s write an awesome story!",
  });

  return editorConfig;
};

export default initializeEditor;
