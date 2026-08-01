import type { DemoEntry } from "@/demos/types"

import TiptapArticleEditorDemo from "./article-editor"
import TiptapBasicDemo from "./basic"
import TiptapCommentComposerDemo from "./comment-composer"
import TiptapFullToolbarDemo from "./full-toolbar"
import TiptapLiveHtmlOutputDemo from "./live-html-output"
import TiptapMinimalToolbarDemo from "./minimal-toolbar"

export const tiptapEditorDemos: DemoEntry[] = [
  {
    name: "basic",
    title: "Basic editor",
    component: TiptapBasicDemo,
    componentSlug: "tiptap-editor",
    sourcePath: "src/demos/tiptap-editor/basic.tsx",
  },
  {
    name: "article-editor",
    title: "Article editor",
    component: TiptapArticleEditorDemo,
    componentSlug: "tiptap-editor",
    sourcePath: "src/demos/tiptap-editor/article-editor.tsx",
  },
  {
    name: "minimal-toolbar",
    title: "Minimal toolbar",
    component: TiptapMinimalToolbarDemo,
    componentSlug: "tiptap-editor",
    sourcePath: "src/demos/tiptap-editor/minimal-toolbar.tsx",
  },
  {
    name: "full-toolbar",
    title: "Complete toolbar",
    component: TiptapFullToolbarDemo,
    componentSlug: "tiptap-editor",
    sourcePath: "src/demos/tiptap-editor/full-toolbar.tsx",
  },
  {
    name: "live-html-output",
    title: "Live HTML output",
    component: TiptapLiveHtmlOutputDemo,
    componentSlug: "tiptap-editor",
    sourcePath: "src/demos/tiptap-editor/live-html-output.tsx",
  },
  {
    name: "comment-composer",
    title: "Comment composer",
    component: TiptapCommentComposerDemo,
    componentSlug: "tiptap-editor",
    sourcePath: "src/demos/tiptap-editor/comment-composer.tsx",
  },
]
