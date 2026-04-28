import { Fragment } from "react"

import { RichTextProvider } from "reactjs-tiptap-editor"

// Base Kit
import { Document } from "@tiptap/extension-document"
import { HardBreak } from "@tiptap/extension-hard-break"
import { ListItem } from "@tiptap/extension-list"
import { Paragraph } from "@tiptap/extension-paragraph"
import { Text } from "@tiptap/extension-text"
import { TextStyle } from "@tiptap/extension-text-style"
import {
	Dropcursor,
	Gapcursor,
	Placeholder,
	TrailingNode,
} from "@tiptap/extensions"

// build extensions
import {
	Blockquote,
	RichTextBlockquote,
} from "reactjs-tiptap-editor/blockquote"
import { Bold, RichTextBold } from "reactjs-tiptap-editor/bold"
import {
	BulletList,
	RichTextBulletList,
} from "reactjs-tiptap-editor/bulletlist"
import { Clear, RichTextClear } from "reactjs-tiptap-editor/clear"
import { Code, RichTextCode } from "reactjs-tiptap-editor/code"
import { CodeBlock, RichTextCodeBlock } from "reactjs-tiptap-editor/codeblock"
import { CodeView, RichTextCodeView } from "reactjs-tiptap-editor/codeview"
import { Color, RichTextColor } from "reactjs-tiptap-editor/color"
import {
	Column,
	ColumnNode,
	MultipleColumnNode,
	RichTextColumn,
} from "reactjs-tiptap-editor/column"
import { Emoji, RichTextEmoji } from "reactjs-tiptap-editor/emoji"
import { ExportPdf, RichTextExportPdf } from "reactjs-tiptap-editor/exportpdf"
import {
	ExportWord,
	RichTextExportWord,
} from "reactjs-tiptap-editor/exportword"
import {
	FontFamily,
	RichTextFontFamily,
} from "reactjs-tiptap-editor/fontfamily"
import { FontSize, RichTextFontSize } from "reactjs-tiptap-editor/fontsize"
import { Heading, RichTextHeading } from "reactjs-tiptap-editor/heading"
import { Highlight, RichTextHighlight } from "reactjs-tiptap-editor/highlight"
import {
	History,
	RichTextRedo,
	RichTextUndo,
} from "reactjs-tiptap-editor/history"
import {
	HorizontalRule,
	RichTextHorizontalRule,
} from "reactjs-tiptap-editor/horizontalrule"
import { Image, RichTextImage } from "reactjs-tiptap-editor/image"
import {
	ImportWord,
	RichTextImportWord,
} from "reactjs-tiptap-editor/importword"
import { Italic, RichTextItalic } from "reactjs-tiptap-editor/italic"

import { Link, RichTextLink } from "reactjs-tiptap-editor/link"
import { MoreMark, RichTextMoreMark } from "reactjs-tiptap-editor/moremark"
import {
	OrderedList,
	RichTextOrderedList,
} from "reactjs-tiptap-editor/orderedlist"
import {
	RichTextSearchAndReplace,
	SearchAndReplace,
} from "reactjs-tiptap-editor/searchandreplace"
import { RichTextStrike, Strike } from "reactjs-tiptap-editor/strike"
import { RichTextTable, Table } from "reactjs-tiptap-editor/table"
import { RichTextAlign, TextAlign } from "reactjs-tiptap-editor/textalign"
import {
	RichTextUnderline,
	TextUnderline,
} from "reactjs-tiptap-editor/textunderline"
import { RichTextVideo, Video } from "reactjs-tiptap-editor/video"

// Slash Command
import {
	SlashCommand,
	SlashCommandList,
} from "reactjs-tiptap-editor/slashcommand"

// Bubble
import {
	RichTextBubbleColumns,
	RichTextBubbleCodeBlock,
	RichTextBubbleImage,
	RichTextBubbleLink,
	RichTextBubbleTable,
	RichTextBubbleText,
	RichTextBubbleVideo,
	RichTextBubbleMenuDragHandle,
} from "reactjs-tiptap-editor/bubble"
import { createLowlight } from "lowlight"
import css from "highlight.js/lib/languages/css"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import html from "highlight.js/lib/languages/xml"
import bash from "highlight.js/lib/languages/bash"

// import "easydrawer/styles.css"
import "reactjs-tiptap-editor/style.css"

import { EditorContent, useEditor } from "@tiptap/react"
import { CharacterCount } from "@tiptap/extensions"
import { Count } from "./components/Editor/extension/Count"
import { EMOJI_LIST } from "./components/Editor/emojis"

// create a lowlight instance with all languages loaded
const lowlight = createLowlight()

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register("html", html)
lowlight.register("xml", html)
lowlight.register("css", css)
lowlight.register("js", js)
lowlight.register("javascript", js)
lowlight.register("ts", ts)
lowlight.register("typescript", ts)
lowlight.register("bash", bash)

// custom document to support columns
const DocumentColumn = /* @__PURE__ */ Document.extend({
	content: "(block|columns)+",
})

const BaseKit = [
	DocumentColumn,
	Text,
	Dropcursor.configure({
		class: "reactjs-tiptap-editor-theme",
		color: "hsl(var(--primary))",
		width: 2,
	}),
	Gapcursor,
	HardBreak,
	Paragraph,
	TrailingNode,
	ListItem,
	TextStyle,
	Placeholder.configure({
		placeholder: "Press '/' for commands",
	}),
]

const LIMIT = 2505

type ToolbarItem =
	| "undo"
	| "redo"
	| "search_and_replace"
	| "clear"
	| "font_family"
	| "heading"
	| "font_size"
	| "bold"
	| "italic"
	| "underline"
	| "strike"
	| "more_mark"
	| "emoji"
	| "text_color"
	| "highlight"
	| "bullet_list"
	| "ordered_list"
	| "align"
	| "link"
	| "image"
	| "video"
	| "blockquote"
	| "horizontal_rule"
	| "code"
	| "code_block"
	| "column"
	| "table"
	| "export_pdf"
	| "import_word"
	| "export_word"
	| "code_viewer"

function createObjectUrlUpload(file: File): Promise<string> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(URL.createObjectURL(file))
		}, 300)
	})
}

const extensions = [
	...BaseKit,
	CharacterCount.configure({
		limit: LIMIT,
	}),

	History,
	SearchAndReplace,
	Clear,
	FontFamily,
	Heading,
	FontSize,
	Bold,
	Italic,
	TextUnderline,
	Strike,
	MoreMark,
	Emoji.configure({
		suggestion: {
			items: async ({ query }: { query?: string }) => {
				const lowerCaseQuery = query?.toLowerCase() ?? ""

				return EMOJI_LIST.filter(({ name }) =>
					name.toLowerCase().includes(lowerCaseQuery)
				)
			},
		},
	}),
	Color,
	Highlight,
	BulletList,
	OrderedList,
	TextAlign,
	Link,
	Image.configure({
		upload: createObjectUrlUpload,
	}),
	Video.configure({
		upload: createObjectUrlUpload,
	}),

	Blockquote,
	HorizontalRule,
	Code,
	CodeBlock.configure({
		lowlight,
	}),
	Column,
	ColumnNode,
	MultipleColumnNode,
	Table,
	ExportPdf,
	ImportWord,
	ExportWord,
	SlashCommand,
	CodeView,
]

const DEFAULT = "<p></p>"

type Props = {
	toolbar?: ToolbarItem[]
	initialContent?: string
	onValueChange?: (html: string) => void
}

const toolbarDefault = [
	"undo",
	"redo",
	"search_and_replace",
	"clear",
	"font_family",
	"heading",
	"font_size",
	"bold",
	"italic",
	"underline",
	"strike",
	"more_mark",
	"image",
	"blockquote",
	"horizontal_rule",
	"code_block",
	"code_viewer",
] as const satisfies ToolbarItem[]

function renderToolbarItem(item: ToolbarItem) {
	switch (item) {
		case "undo":
			return <RichTextUndo />
		case "redo":
			return <RichTextRedo />
		case "search_and_replace":
			return <RichTextSearchAndReplace />
		case "clear":
			return <RichTextClear />
		case "font_family":
			return <RichTextFontFamily />
		case "heading":
			return <RichTextHeading />
		case "font_size":
			return <RichTextFontSize />
		case "bold":
			return <RichTextBold />
		case "italic":
			return <RichTextItalic />
		case "underline":
			return <RichTextUnderline />
		case "strike":
			return <RichTextStrike />
		case "more_mark":
			return <RichTextMoreMark />
		case "emoji":
			return <RichTextEmoji />
		case "text_color":
			return <RichTextColor />
		case "highlight":
			return <RichTextHighlight />
		case "bullet_list":
			return <RichTextBulletList />
		case "ordered_list":
			return <RichTextOrderedList />
		case "align":
			return <RichTextAlign />
		case "link":
			return <RichTextLink />
		case "image":
			return <RichTextImage />
		case "video":
			return <RichTextVideo />
		case "blockquote":
			return <RichTextBlockquote />
		case "horizontal_rule":
			return <RichTextHorizontalRule />
		case "code":
			return <RichTextCode />
		case "code_block":
			return <RichTextCodeBlock />
		case "column":
			return <RichTextColumn />
		case "table":
			return <RichTextTable />
		case "export_pdf":
			return <RichTextExportPdf />
		case "import_word":
			return <RichTextImportWord />
		case "export_word":
			return <RichTextExportWord />
		case "code_viewer":
			return <RichTextCodeView />
	}
}

const RichTextToolbar = ({ toolbar }: { toolbar: ToolbarItem[] }) => {
	return (
		<div className="flex flex-wrap items-center gap-2 p-1!">
			{toolbar.map((item, index) => (
				<Fragment key={`${item}-${index}`}>{renderToolbarItem(item)}</Fragment>
			))}
		</div>
	)
}

function TiptapEditor({
	toolbar = [...toolbarDefault],
	initialContent = DEFAULT,
	onValueChange,
}: Props) {
	const editor = useEditor({
		textDirection: "auto",
		content: initialContent,
		extensions,
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			onValueChange?.(editor.getHTML())
		},
	})

	if (!editor) {
		return <p>Loading editor...</p>
	}

	return (
		<div className="[&>div]:bg-transparent!">
			<RichTextProvider editor={editor}>
				<div className="overflow-hidden border-none! bg-background">
					<div className="flex max-h-full w-full flex-col [&_.tiptap:focus-visible]:outline-none!">
						<RichTextToolbar {...{ toolbar }} />

						<EditorContent editor={editor} />

						{/* Bubble */}
						<RichTextBubbleColumns />
						<RichTextBubbleCodeBlock />
						<RichTextBubbleLink />
						<RichTextBubbleImage />
						<RichTextBubbleVideo />
						<RichTextBubbleTable />
						<RichTextBubbleText />

						{/* Command List */}
						<SlashCommandList />
						<RichTextBubbleMenuDragHandle />
					</div>

					<Count editor={editor} limit={LIMIT} />
				</div>
			</RichTextProvider>
		</div>
	)
}

export { TiptapEditor }
