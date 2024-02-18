<template>
  <editor-content :editor="editor" />
</template>

<script setup>
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";

const props = defineProps({
  content: String,
  placeholderF: String,
});

const editor = useEditor({
  content: props.content,
  extensions: [
    StarterKit.configure({
      document: false,
    }),
    Underline,
    Document,
    Placeholder.configure({
      placeholder: props.placeholderF ? props.placeholderF : "Descrição...",
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
  ],
  editorProps: {
    attributes: {
      class: "text-textPrimaryColorF text-sm p-4 outline-none border-none",
    },
  },
  editable: true,
});

watch(
  () => props.content,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      editor.value.commands.setContent(props.content, false)
    }
  }
);
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 5px;
  border-radius: 10px;
  background-color: #121214;
}

::-webkit-scrollbar-thumb {
  background-color: #2f2f34;
}

.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
    margin-left: 15px;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  h1 {
    font-size: 34px;
  }

  h2 {
    font-size: 28px;
  }

  h3 {
    font-size: 22px;
  }
}

.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #b0b0b0;
  pointer-events: none;
  height: 0;
}
</style>
