import { visit } from 'unist-util-visit';

function createPreviewNode(
  currentNode: any,
  attrs: Array<[string, string]>,
) {
  Object.assign(currentNode, {
    type: 'mdxJsxFlowElement',
    name: 'RunNode',
    attributes: attrs.map(it => ({
      type: 'mdxJsxAttribute',
      name: it[0],
      value: it[1],
    })),
  });
}

export function remarkPlugin() {

  return (tree: any, vfile: any) => {

    // 1. Internal demo, use ```j/tsx to declare demo
    visit(tree, 'code', (node: any) => {
      if (node.lang === 'jsx' || node.lang === 'tsx') {
        const hasDemoMeta = node?.meta?.includes('demo');

        // do not anything for pure mode
        if (!hasDemoMeta) {
          return;
        }

        createPreviewNode(node, [
          ['code', node.value],
          ['language', node.lang],
        ]);
      }
    });
  };
}
