import { RspressPlugin } from '@rspress/shared';
import { remarkPlugin } from './remarkPlugin';
import { join } from 'node:path';


export function pluginRunNodeJsx(): RspressPlugin {

  return {
    name: 'rspress-plugin-run-node-jsx',
    markdown: {
      remarkPlugins: [remarkPlugin],
      globalComponents: [
        join(__dirname, 'RunNode.tsx'),
      ],
    },
    globalStyles: join(__dirname, 'style.css'),
  };
}
