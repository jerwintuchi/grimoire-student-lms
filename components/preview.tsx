"use client";

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

interface PreviewProps {
  value: string;
}

const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      value={value}
      readOnly={true}
      modules={{ toolbar: false }}
    />
  );
};

export default Preview;
