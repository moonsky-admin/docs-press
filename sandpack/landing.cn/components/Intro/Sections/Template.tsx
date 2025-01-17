/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SandpackPredefinedTemplate } from "@codesandbox/sandpack-react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

import {
  CodeBlock,
  SandpackPreview,
  CardTitle,
  CardDescription,
} from "../../common";
import { useBreakpoint } from "../../common/useBreakpoint";
import { useSandpackExample } from "../SandpackExample";

import {
  Row,
  Content,
  getRelativeCoordinates,
  ToolTip,
  SnippetButton,
  SandpackContainerPlaceholder,
  SandpackContainerMobile,
  FadeAnimation,
  THRESHOLD_VIEW,
} from "./common";

const AnimatedPresenceTyped = AnimatePresence as any;

const frameworkOptions: SandpackPredefinedTemplate[] = [
  "react",
  "nextjs",
  "vue",
  "node",
  "angular",
];

export const TemplateExample: React.FC = () => {
  const { ref, inView } = useInView({ threshold: THRESHOLD_VIEW });
  const { setOptions } = useSandpackExample();
  const [toolTipVisibility, setToolTipVisibility] = useState(false);
  const [mousePosition, setMousePosition] = useState<Record<string, number>>(
    {}
  );
  const boxRef = useRef<HTMLButtonElement>(null);
  const [template, setTemplate] = useState(frameworkOptions[0]);
  const higherMobile = useBreakpoint("bp2");

  useEffect(() => {
    setOptions({ template });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template]);

  useEffect(() => {
    if (!higherMobile) {
      setTemplate(frameworkOptions[0]);

      return;
    }

    if (inView) {
      setTemplate(frameworkOptions[0]);
    } else {
      setTemplate(frameworkOptions[0]);
    }
  }, [higherMobile, inView]);

  const shuffleTemplate = (): void => {
    const currentIndex = frameworkOptions.indexOf(template);

    setTemplate(frameworkOptions[(currentIndex + 1) % frameworkOptions.length]);
  };

  return (
    <FadeAnimation>
      <Row ref={ref}>
        <Content>
          <CardTitle>只需几行代码即可开始</CardTitle>
          <CardDescription>
            设置{" "}
            <a
              href="/docs/getting-started/custom-content#template"
              rel="noreferrer"
              target="_blank"
            >
              <code>template</code>
            </a>{" "}
            属性，只需几行代码即可开始使用 Sandpack，每个模板都包含立即启动项目所需的所有<code>files</code>和<code>dependencies</code>。
          </CardDescription>

          <SnippetButton
            ref={boxRef}
            onClick={shuffleTemplate}
            onMouseEnter={(): void => setToolTipVisibility(true)}
            onMouseLeave={(): void => setToolTipVisibility(false)}
            onMouseMove={(event): void =>
              setMousePosition(getRelativeCoordinates(event, boxRef.current))
            }
          >
            <CodeBlock
              key={template}
            >{`<Sandpack template="${template}">`}</CodeBlock>
          </SnippetButton>

          <div style={{ height: 0, marginTop: "-24px" }}>
            {toolTipVisibility && higherMobile && (
              <AnimatedPresenceTyped>
                <>
                  <ToolTip
                    animate={{
                      opacity: 1,
                      x: mousePosition.x,
                      y: mousePosition.y,
                    }}
                    exit={{ opacity: 0 }}
                    initial={{
                      opacity: 0,
                      x: mousePosition.x,
                      y: mousePosition.y,
                    }}
                  >
                    Click to change
                  </ToolTip>
                </>
              </AnimatedPresenceTyped>
            )}
          </div>
        </Content>

        <SandpackContainerMobile>
          <SandpackPreview options={{ template }} />
        </SandpackContainerMobile>

        <SandpackContainerPlaceholder />
      </Row>
    </FadeAnimation>
  );
};
