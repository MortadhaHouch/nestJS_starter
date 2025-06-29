import { useState } from 'react';
import '@mdxeditor/editor/style.css'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  diffSourcePlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  codeMirrorPlugin,
  codeBlockPlugin,
  DiffSourceToggleWrapper
} from '@mdxeditor/editor'
export default function Editor() {
    const [value, setValue] = useState("# Hello World\n\nThis is a simple MDX editor example.\n\n## Features\n- Headings\n- Lists\n- Quotes\n- Thematic Breaks\n- Markdown Shortcuts");
    async function imageUploadHandler(image: File) {
        const fileReader = new FileReader();
        return new Promise<string>((resolve, reject) => {
            fileReader.onload = () => {
                resolve(fileReader.result as string);
            };
            fileReader.onerror = () => {
                reject(new Error('Failed to read image file'));
            };
            fileReader.readAsDataURL(image);
        });
    }
    return (
        <MDXEditor
            plugins={[
                // Example Plugin Usage
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                codeBlockPlugin(),
                linkDialogPlugin(),
                toolbarPlugin({
                    toolbarClassName: 'mdx-editor-toolbar',
                    toolbarContents: () => (
                        <>
                            <DiffSourceToggleWrapper>
                                <UndoRedo />
                            </DiffSourceToggleWrapper>
                            <BoldItalicUnderlineToggles />
                            <BlockTypeSelect/>
                            <CodeToggle/>
                            <CreateLink/>
                            <InsertCodeBlock/>
                            <InsertFrontmatter/>
                            <InsertImage/>
                            <InsertTable/>
                            <InsertThematicBreak/>
                            <ListsToggle/>
                            <Separator/>
                        </>
                    )
                }),
                imagePlugin({ imageUploadHandler }),
                tablePlugin({
                    stringLength(value) {
                        return value.length;
                    },
                    tableCellPadding: true,
                    tablePipeAlign: true
                }),
                diffSourcePlugin({ diffMarkdown: 'An older version', viewMode: 'rich-text' }),
                directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
                codeMirrorPlugin(),
                codeBlockPlugin()
            ]}
            markdown={value}
            onChange={(newValue: string) => setValue(newValue)}
        />
    )
}
