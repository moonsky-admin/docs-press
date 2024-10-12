// @ts-nocheck
import { Runner } from '@rspress/plugin-playground/web';
import getImport from '_rspress_playground_imports';

export interface PreviewNodeProps {
  code: string;
  language: string;
}

export default function RunNode({ language, code }: PreviewNodeProps) {

  return (
    <div className="rsp-preview">
      <Runner language={language} code={code} getImport={getImport}/>
    </div>
  );
}
