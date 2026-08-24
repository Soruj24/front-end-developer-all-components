interface Device {
  id: number;
  type: string;
  visitors: number;
  online: number;
}

interface DevicesProps {
  devices: Device[];
}

export function Devices({ devices }: DevicesProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-medium text-muted-foreground">Devices</p>
      <div className="mt-4 space-y-3">
        {devices.map((device) => (
          <div key={device.id} className="flex items-center justify-between">
            <span className="text-sm">{device.type}</span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{device.visitors} visitors</span>
              <span className="flex items-center gap-1 text-sm text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {device.online} online
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}