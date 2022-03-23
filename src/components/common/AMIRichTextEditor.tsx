import Grid from "@mui/material/Grid";
// @ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import InlineEditor from "@ckeditor/ckeditor5-build-inline";

interface RichTextEditorProps {
  onChange: (editorData: string) => void;
  id?: string;
  data: string;
}

const AMIRichTextEditor = ({ onChange, id, data }: RichTextEditorProps) => {
  return (
    <Grid
      container
      width='100%'
      border={1}
      borderColor='#ccc'
      bgcolor='white'
      borderRadius={1}
    >
      <Grid item xs={12}>
        <CKEditor
          id={id}
          name='ami-rich-text-editor'
          data={data}
          editor={ClassicEditor}
          // @ts-ignore
          onBlur={(event, editor) => {
            onChange(editor.getData());
          }}
          config={{
            toolbar: [
              "heading",
              "bold",
              "italic",
              "|",
              "link",
              "blockQuote",
              "|",
              "numberedList",
              "bulletedList",
              "undo",
              "redo",
            ],
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AMIRichTextEditor;
