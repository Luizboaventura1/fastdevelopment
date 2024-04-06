<template>
  <div
    :style="`background-color:${bgEditor};width:${props.width}px;`"
    class="w-full ring-1 grid grid-rows-[auto,auto,1fr] bg-subSecondaryColorF ring-thirdBorderF overflow-hidden rounded-md"
    :class="`${editorBackground} h-[${
      props.height + 'px' ? props.height + 'px' : 'h-full'
    }]`"
  >
    <Toolbar>
      <ButtonTemplate @click="bold" size="30"
        ><BoldIcon size="22"
      /></ButtonTemplate>

      <ButtonTemplate @click="italic" size="30"
        ><ItalicIcon size="17"
      /></ButtonTemplate>

      <ButtonTemplate @click="underline" size="30"
        ><UnderlineIcon size="20"
      /></ButtonTemplate>

      <ButtonTemplate @click="h1" size="30"
        ><H1Icon size="20"
      /></ButtonTemplate>

      <ButtonTemplate @click="h2" size="30"
        ><H2Icon size="20"
      /></ButtonTemplate>

      <ButtonTemplate @click="h3" size="30"
        ><H3Icon size="20"
      /></ButtonTemplate>

      <ButtonTemplate @click="bulletList" size="30"
        ><BulletListIcon size="17"
      /></ButtonTemplate>

      <ButtonTemplate @click="orderedList" size="30"
        ><OrderedListIcon size="20"
      /></ButtonTemplate>

      <ButtonTemplate @click="alignLeft" size="30"
        ><TextLeftIcon size="29"
      /></ButtonTemplate>

      <ButtonTemplate @click="alignCenter" size="30"
        ><TextCenterIcon size="27"
      /></ButtonTemplate>

      <ButtonTemplate @click="alignRight" size="30"
        ><TextRightIcon size="29"
      /></ButtonTemplate>
    </Toolbar>
    <DividerDefault />
    <div class="overflow-y-auto">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script setup>
import Toolbar from "./Toolbar/index.vue";
import ButtonTemplate from "./Buttons/ButtonTemplate.vue";
import BoldIcon from "./Icons/BoldIcon.vue";
import ItalicIcon from "./Icons/ItalicIcon.vue";
import BulletListIcon from "./Icons/BulletListIcon.vue";
import DividerDefault from "./Dividers/DividerDefault.vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";
import UnderlineIcon from "./Icons/UnderlineIcon.vue";
import H1Icon from "./Icons/H1Icon.vue";
import H2Icon from "./Icons/H2Icon.vue";
import H3Icon from "./Icons/H3Icon.vue";
import OrderedListIcon from "./Icons/OrderedListIcon.vue";
import Placeholder from "@tiptap/extension-placeholder";
import TextLeftIcon from "./Icons/TextLeftIcon.vue";
import TextCenterIcon from "./Icons/TextCenterIcon.vue";
import TextRightIcon from "./Icons/TextRightIcon.vue";
import TextAlign from "@tiptap/extension-text-align";

const props = defineProps({
  editorBackground: String,
  height: String,
  width: String,
  placeholderF: String,
  htmlInput: String,
});

// Editor

const editor = useEditor({
  content: props.htmlInput,
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

const bold = () => {
  editor.value.chain().focus().toggleBold().run();
};

const italic = () => {
  editor.value.chain().focus().toggleItalic().run();
};

const underline = () => {
  editor.value.chain().focus().toggleUnderline().run();
};

const h1 = () => {
  editor.value.chain().focus().toggleHeading({ level: 1 }).run();
};

const h2 = () => {
  editor.value.chain().focus().toggleHeading({ level: 2 }).run();
};

const h3 = () => {
  editor.value.chain().focus().toggleHeading({ level: 3 }).run();
};

const bulletList = () => {
  editor.value.chain().focus().toggleBulletList().run();
};

const orderedList = () => {
  editor.value.chain().focus().toggleOrderedList().run();
};

const alignLeft = () => {
  editor.value.chain().focus().setTextAlign("left").run();
};

const alignCenter = () => {
  editor.value.chain().focus().setTextAlign("center").run();
};

const alignRight = () => {
  editor.value.chain().focus().setTextAlign("right").run();
};

// Floating menu
let isEditable = ref(true);

watch(isEditable, (val) => {
  editor.value.setEditable(val);
});

// Styles of editor

const defaultColor = "'#fff'";

const bgEditor = computed(() => {
  if (props.editorBackground) return props.editorBackground;
  else return defaultColor;
});

// Get html

const emit = defineEmits(["getHtml"]);

watchEffect(() => {
  if (editor.value) {
    emit("getHtml", editor.value.getHTML());
  }
});
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
    font-weight: bold;
  }

  h2 {
    font-size: 28px;
    font-weight: bold;
  }

  h3 {
    font-size: 22px;
    font-weight: bold;
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
