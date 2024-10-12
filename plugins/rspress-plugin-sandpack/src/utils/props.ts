const cacheMap: Map<string, string> = new Map<string, string>();

function toFileName(name: string) {
  let value: string | undefined = cacheMap.get(name);
  if (value) {
    return value;
  }
  value = atob(name.replace(/-/g, '=').replace(/_/g, '\/'));
  cacheMap.set(name, value);
  return value;
}


function setObjectProp(
  finalProps: any,
  type: string,
  name: string,
  value: any,
): void {
  switch (type) {
    case 'f': {
      const fileName: string = toFileName(name);
      finalProps.files[fileName] = value;
      break;
    }
  }
}

interface PrefixedHandler {
  prefix: string;

  handler(props: any, name: string, value: string): void;
}

const VALUES_MAP: Record<string, boolean> = {
  true: true,
  false: false,
};

function asValue(value: string): boolean | string {
  return VALUES_MAP[value] || value;
}

function newPrefixedHandler(prefix: string, group: string = prefix): PrefixedHandler {
  const colonPrefix: string = prefix + ':';
  const groupName: string = group || prefix;
  return {
    prefix: colonPrefix,
    handler(props: any, name: string, value: string) {
      const prop: string = name.slice(colonPrefix.length);
      let options = props[groupName];
      if (!options) {
        options = {};
        props[prefix] = options;
      }
      options[prop] = asValue(value);
    },
  };
}

const handlers: PrefixedHandler[] = [
  newPrefixedHandler('options'),
  newPrefixedHandler('customSetup'),
  newPrefixedHandler('setup', 'customSetup'),
];

export function useSandpackProps(props: any) {
  const keys: string[] = Object.keys(props);
  const finalProps: any = {
    files: {},
    customSetup: {
      dependencies: {},
    },
  };

  outer:
    for (let i: number = 0, key: string; i < keys.length; i++) {
      key = keys[i];
      if (key.indexOf(':') === 1) {
        setObjectProp(finalProps, key.charAt(0), key.substring(2), props[key]);
      } else if (key === 'deps') {
        (props[key] || '').split(/,|;/).reduce((deps: any, dep: string) => {
          const idx: number = dep.lastIndexOf('@');
          if (idx > 1) {
            deps[dep.slice(0, idx)] = dep.slice(idx + 1);
          } else {
            deps[dep] = 'latest';
          }
          return deps;
        }, finalProps.customSetup.dependencies);
      } else {
        for (let j = 0; j < handlers.length; j++) {
          const { prefix, handler }: PrefixedHandler = handlers[j];
          if (key.startsWith(prefix)) {
            handler(finalProps, key, props[key]);
            continue outer;
          }
        }
        finalProps[key] = props[key];
      }
    }

  console.log('[Final props] ', finalProps);

  return finalProps;
}
