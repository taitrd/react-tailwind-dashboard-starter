import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Descendant, BaseEditor, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { Bold, Italic, List, AlignLeft, AlignCenter, AlignRight, Heading1, Heading2 } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';

type CustomElement = {
  type: 'paragraph' | 'heading-one' | 'heading-two';
  align?: 'left' | 'center' | 'right';
  children: CustomText[];
};

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const defaultInitialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Start editing your page content here...' }],
  },
];

const Editor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(() => {
    const savedContent = localStorage.getItem('content');
    try {
      const parsedContent = savedContent ? JSON.parse(savedContent) : null;
      return Array.isArray(parsedContent) && parsedContent.length > 0 
        ? parsedContent 
        : defaultInitialValue;
    } catch {
      return defaultInitialValue;
    }
  });

  const renderElement = useCallback((props: any) => {
    const { element, attributes, children } = props;
    const align = element.align || 'left';
    const style = { textAlign: align };

    switch (element.type) {
      case 'heading-one':
        return <h1 {...attributes} className="text-4xl font-bold mb-4" style={style}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes} className="text-2xl font-bold mb-3" style={style}>{children}</h2>;
      default:
        return <p {...attributes} className="mb-4" style={style}>{children}</p>;
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    const { attributes, children, leaf } = props;
    let text = children;

    if (leaf.bold) {
      text = <strong>{text}</strong>;
    }

    if (leaf.italic) {
      text = <em>{text}</em>;
    }

    return <span {...attributes}>{text}</span>;
  }, []);

  const toggleFormat = useCallback((format: 'bold' | 'italic') => {
    const isActive = Boolean(editor.marks?.[format]);
    if (isActive) {
      editor.removeMark(format);
    } else {
      editor.addMark(format, true);
    }
  }, [editor]);

  const toggleBlock = useCallback((type: 'heading-one' | 'heading-two' | 'paragraph') => {
    const isActive = Boolean(editor.selection) && editor.nodes({
      match: n => SlateElement.isElement(n) && n.type === type,
    }).next().done;

    editor.setNodes(
      { type: isActive ? 'paragraph' : type },
      { match: n => SlateElement.isElement(n) }
    );
  }, [editor]);

  const toggleAlign = useCallback((align: 'left' | 'center' | 'right') => {
    editor.setNodes(
      { align },
      { match: n => SlateElement.isElement(n) }
    );
  }, [editor]);

  const ToolbarButton = ({ icon: Icon, onClick, isActive = false }: { icon: any; onClick: () => void; isActive?: boolean }) => (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`p-2 rounded-lg transition-colors ${
        isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );

  return (
    <ErrorBoundary>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <ToolbarButton icon={Bold} onClick={() => toggleFormat('bold')} />
            <ToolbarButton icon={Italic} onClick={() => toggleFormat('italic')} />
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <ToolbarButton icon={Heading1} onClick={() => toggleBlock('heading-one')} />
            <ToolbarButton icon={Heading2} onClick={() => toggleBlock('heading-two')} />
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <ToolbarButton icon={List} onClick={() => {}} />
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <ToolbarButton icon={AlignLeft} onClick={() => toggleAlign('left')} />
            <ToolbarButton icon={AlignCenter} onClick={() => toggleAlign('center')} />
            <ToolbarButton icon={AlignRight} onClick={() => toggleAlign('right')} />
          </div>
        </div>
        <Slate 
          editor={editor} 
          initialValue={value}
          onChange={newValue => {
            setValue(newValue);
            const content = JSON.stringify(newValue);
            localStorage.setItem('content', content);
          }}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Start typing..."
            className="min-h-[500px] focus:outline-none prose max-w-none"
          />
        </Slate>
      </div>
    </ErrorBoundary>
  );
};

export default Editor;