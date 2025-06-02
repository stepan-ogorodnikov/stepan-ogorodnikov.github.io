"use client";

import { Content } from "@/components/layout/content";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fileSet, filesSet } from "@/store/nav-slice";
import { type PropsWithChildren, type ReactNode, useEffect } from "react";

type Props = PropsWithChildren & {
  files: string[];
  filename: string;
  source: ReactNode;
};

export function App({ files, filename, source, children }: Props) {
  const dispatch = useAppDispatch();
  const isCodeVisible = useAppSelector(state => state.app.appControls.isCodeVisible);

  useEffect(() => {
    dispatch(filesSet({ files }));
  }, []);

  useEffect(() => {
    dispatch(fileSet(filename));
  }, [filename]);

  return (
    <ResizablePanelGroup className="grow" id="layout" direction="horizontal" autoSaveId="layout">
      <ResizablePanel className="flex overflow-auto" id="content-panel" order={1}>
        <Content>
          {children}
        </Content>
      </ResizablePanel>
      {isCodeVisible && (
        <>
          <ResizableHandle
            className="max-sm:hidden"
            withHandle
          />
          <ResizablePanel className="max-sm:hidden relative" id="code-panel" order={2}>
            {source}
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
}
