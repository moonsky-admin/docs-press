import { visit } from 'unist-util-visit';


function createSandpackNode(
  currentNode: any,
  attrs: Array<[string, string]>,
) {
  Object.assign(currentNode, {
    type: 'mdxJsxFlowElement',
    name: 'SandpackElement',
    attributes: attrs.map(([name, value]) => ({
      type: 'mdxJsxAttribute',
      name: name,
      value: value,
    })),
  });
}

const REGEX_BEGIN = /^\s*```\s*(\w+)\s*(.*)?\n/;
const REGEX_END = /\n\s*```/;
const NAME_REGEX_IN_MD = /{\s*name=["']?([\w\.\-\$\/]+)}\s*/;
const NAME_REGEX_IN_MDX = /\s*name=["']?([\w\.\-\$\/]+)\s*/;
const CODE_NAMED = /```\s*([\w\.\-\$\/]+)/;

const SUPPORTED_LANGS: string[] = 'jsx,js,tsx,ts,css,scss,less,html,vue,svelte'.split(',')
  .filter((it: string): boolean => !!it);

const DEFAULT_DEPS: Record<string, string> = { scss: 'sass', less: 'less', sass: 'sass', styl: 'stylus' };

function defaultDeps(ext: string, deps: Set<string>) {
  const dep: string | undefined = DEFAULT_DEPS[ext];
  if (dep) {
    deps.add(dep);
  }
}

function underlinedExt(name: string, deps: Set<string>): string {
  const idx = name.lastIndexOf('.');
  const ext: string = name.slice(idx + 1);
  defaultDeps(ext, deps);
  const filename: string = btoa(name).replace(/=/g, '-').replace(/\//g, '_');
  return filename;
}

function parseName(name: string, deps: Set<string>): string {
  let match = name.match(NAME_REGEX_IN_MD);
  if (match) {
    return 'f:' + underlinedExt(match[1], deps);
  }
  match = name.match(NAME_REGEX_IN_MDX);
  if (match) {
    return 'f:' + underlinedExt(match[1], deps);
  }
  match = name.match(CODE_NAMED);
  if (match) {
    const first = match[1];
    const lower = first.toLowerCase();
    if (SUPPORTED_LANGS.includes(lower)) {
      defaultDeps(lower, deps);
      return 'f:' + underlinedExt('index.' + lower, deps);
    } else {
      return 'f:' + underlinedExt(first, deps);
    }
  }
  return '';
};

function parseFilesAttrs(
  attrs: Array<[string, string]>,
  node: { value: string, meta: string },
  deps: Set<string>,
): Array<[string, string]> {
  const inputLength: number = attrs.length;

  let nodeValue: string = node.value;
  let start: RegExpMatchArray | null = null;
  let end: RegExpMatchArray | null = null;
  let rest: string | null = null;
  do {
    start = nodeValue.match(REGEX_BEGIN);
    if (start) {
      const name: string = parseName(start[0].trim(), deps);
      rest = nodeValue.slice(start[0].length);
      end = rest.match(REGEX_END);
      if (end && name) {
        attrs.push([
          name,
          rest.slice(0, end.index),
        ]);
        nodeValue = rest.slice(end.index! + end[0].length);
        continue;
      }
    }
    break;
  } while (1);
  if (attrs.length === inputLength) {
    const name: string = parseName(node.meta, deps);
    attrs.push([name, nodeValue]);
  }

  return attrs;
}


function parseMetaAttrs(
  attrs: Array<[string, string]>,
  meta: string,
  deps: Set<string>,
): Array<[string, string]> {
  let depsAdded: boolean = false;
  meta.split(' ')
    .filter(it => it)
    .reduce((
      newAttrs: Array<[string, string]>,
      info: string,
    ): Array<[string, string]> => {
      const eqIdx = info.indexOf('=');
      if (eqIdx < 0) {
        if (info === 'deps') {
          return newAttrs;
        } else {
          newAttrs.push([info, 'true']);
        }
      } else {
        const name: string = info.slice(0, eqIdx);
        let value: string = info.slice(eqIdx + 1);
        if (name === 'deps' && deps.size) {
          depsAdded = true;
          value = [...deps, value].join(';');
        }
        newAttrs.push([name, value]);
      }
      return newAttrs;
    }, attrs);
  if (depsAdded) {
    return attrs;
  }
  if (deps.size) {
    attrs.push(['deps', [...deps].join(';')]);
  }
  return attrs;
}

export function remarkPlugin({
  TEMPLATES,
}: any) {

  return (tree: any, vfile: any) => {

    visit(tree, 'code', (node: any) => {
      const lang = node.lang;
      const template: string | undefined = TEMPLATES[lang];

      if (template) {
        const deps = new Set<string>();
        const attribures: Array<[string, string]> = [
          ['template', template],
        ];

        parseFilesAttrs(attribures, node, deps);
        parseMetaAttrs(attribures, node.meta || '', deps);

        createSandpackNode(node, attribures);
      }
    });

  };
}
