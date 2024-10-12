import { RspressPlugin } from '@rspress/shared';
import { remarkPlugin } from './remarkPlugin';
import { join } from 'node:path';
import { SANDBOX_TEMPLATES, SandpackPredefinedTheme } from '@codesandbox/sandpack-react';


export type { SandpackPredefinedTheme } from '@codesandbox/sandpack-react';

export type SandpackPredefinedTemplate = keyof typeof SANDBOX_TEMPLATES;

export interface SandpackDefaults {
  theme?: SandpackPredefinedTheme;
  template?: SandpackPredefinedTemplate;
}

export interface SandpackConsoleView {
  templateNames?: boolean;
}

export interface SandpackPluginOptions {
  prefix?: string;
  defaults?: SandpackDefaults,
  consoleView?: SandpackConsoleView
}

export function pluginSandpack({
  prefix,
  defaults,
  consoleView,
}: SandpackPluginOptions): RspressPlugin {
  const { template } = defaults || {} as SandpackDefaults;
  const view: SandpackConsoleView = consoleView || {};

  const finalPrefix = (prefix || 'sandpack').trim();
  if (!finalPrefix) {
    throw new Error('[Plugin] sandpack prefix can not be empty');
  }

  const prefixColon = finalPrefix + ':';
  const TEMPLATES: Record<string, string> = Object.keys(SANDBOX_TEMPLATES)
    .reduce((map: Record<string, string>, name: string): Record<string, string> => {
      map[prefixColon + name] = name;
      return map;
    }, { [finalPrefix]: template || 'vanilla' });

  if (view.templateNames) {
    console.log(`[Plugin] sandpack templates: `, Object.keys(TEMPLATES));
  }

  return {
    name: 'rspress-plugin-sandpack',
    markdown: {
      remarkPlugins: [
        [remarkPlugin, { TEMPLATES }],
      ],
      globalComponents: [
        join(__dirname, 'SandpackElement.tsx'),
      ],
    },
  };
}
