declare module 'react-quill' {
    import { Component } from 'react';
  
    interface QuillEditorProps {
      value?: string;
      defaultValue?: string;
      theme?: string;
      onChange?: (content: string, delta: any, source: string, editor: any) => void;
      onFocus?: (range: any, source: string, editor: any) => void;
      onBlur?: (previousRange: any, source: string, editor: any) => void;
      readOnly?: boolean;
      modules?: { [key: string]: any };
      formats?: string[];
      bounds?: string | HTMLElement;
      placeholder?: string;
      tabIndex?: number;
      forwardedRef?: React.Ref<any>;
      style?: React.CSSProperties;
      className?: string;
    }
  
    class QuillEditor extends Component<QuillEditorProps> {}
  
    export = QuillEditor;
  }
  