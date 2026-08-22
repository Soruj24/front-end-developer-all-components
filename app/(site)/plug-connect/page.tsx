"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { PLUG_CONNECT_SOURCE } from "./plug-connect-source";
import {
  CONNECTED_SERVICE_EXAMPLE,
  SERVICE_LIST_EXAMPLE,
  WITH_ACTION_EXAMPLE,
  MULTI_SERVICE_GRID_EXAMPLE,
  CONNECTION_STATUS_EXAMPLE,
  CONFIGURABLE_SERVICE_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./plug-connect-examples";
import {
  ConnectedService,
  ServiceList,
  WithAction,
  MultiServiceGrid,
  ConnectionStatus,
  ConfigurableService,
  PlaygroundDemo,
} from "./demos";

export default function PlugConnectPage() {
  return (
    <ComponentDocPage
      name="Plug Connect"
      category="Data Display"
      description="A connection status component for displaying service integrations, API connections, and plugin status."
    >
      <PreviewPanel filename="plug-connect.tsx">
        <ConnectedService />
      </PreviewPanel>

      <SourceCodeViewer
        source={PLUG_CONNECT_SOURCE}
        filename="components/ui/PlugConnect/ConnectedService.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all plug connect variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Connected Service" description="Single service card showing connected status." code={CONNECTED_SERVICE_EXAMPLE}>
          <ConnectedService />
        </ExampleBlock>
        <ExampleBlock title="Service List" description="List of services with individual connection indicators." code={SERVICE_LIST_EXAMPLE}>
          <ServiceList />
        </ExampleBlock>
        <ExampleBlock title="With Action" description="Service card with connect/disconnect toggle button." code={WITH_ACTION_EXAMPLE}>
          <WithAction />
        </ExampleBlock>
        <ExampleBlock title="Multi Service Grid" description="Grid of toggleable service integrations with status icons." code={MULTI_SERVICE_GRID_EXAMPLE}>
          <MultiServiceGrid />
        </ExampleBlock>
        <ExampleBlock title="Connection Status" description="Cycling status indicator (connected/connecting/disconnected)." code={CONNECTION_STATUS_EXAMPLE}>
          <ConnectionStatus />
        </ExampleBlock>
        <ExampleBlock title="Configurable Service" description="Name-editable service card with live connection toggle." code={CONFIGURABLE_SERVICE_EXAMPLE}>
          <ConfigurableService />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
