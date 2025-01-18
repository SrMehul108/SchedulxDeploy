import { useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  AutoImage,
  Autosave,
  CKBox,
  CKBoxImageEdit,
  CloudServices,
  Essentials,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Link,
  LinkImage,
  Paragraph,
  PictureEditing,
  SpecialCharacters,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import "./ckediter.css"

const LICENSE_KEY =
    'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzgzNjc5OTksImp0aSI6IjhhYzI0NWI4LTJjNmYtNGViZC04OTFkLWY3ZWRiMmE5NDkxOCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImI1YmYzZDM1In0.uC0XXH3OuhTgv4hRcJchN-q3Ic86SroBaDbGxAG-3XeTqsk_kFLxv2v0PZgkhILl7axD5TV-BILx-s35QSKQ1Q';

    const CLOUD_SERVICES_TOKEN_URL =
    'https://8fqtxnl_of9v.cke-cs.com/token/dev/494cf51257b241c249390c2e76647b24d273233a7a6dc286f8b7befa1472?limit=10';

export default function Editer({ onSave, onClose }) {
  const editorRef = useRef(null);

  const editorConfig = {
    toolbar: {
      items: [ "insertImage", "ckbox"],
      shouldNotGroupWhenFull: true,
    },
    plugins: [
      AutoImage,
      Autosave,
      CKBox,
      CKBoxImageEdit,
      CloudServices,
      Essentials,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Link,
      LinkImage,

      PictureEditing,
      SpecialCharacters,
    ],
    cloudServices: {
      tokenUrl: CLOUD_SERVICES_TOKEN_URL,
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "resizeImage",
        "|",
        "ckboxImageEdit",
      ],
    },
    placeholder: "Type or paste your content here!",
    licenseKey: LICENSE_KEY,
  };

  const handleSave = () => {
    const editorData = editorRef.current?.getData();
   const mediaUrls = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(editorData, "text/html");
    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      if (img.src) mediaUrls.push(img.src);
    });

    // Pass postContent and mediaUrls to the parent
    localStorage.setItem("mediaUrls", mediaUrls);
    onSave({ mediaUrls });
  };

  return (
    <div className="main-container">
      <div className="editor-container">
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          onReady={(editor) => (editorRef.current = editor)}
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
