import { Sandpack } from '@codesandbox/sandpack-react';
import { createElement } from 'react';
import { useSandpackProps } from './utils';


export default function SandpackElement(props: any) {

  return createElement(Sandpack, useSandpackProps(props));
};
