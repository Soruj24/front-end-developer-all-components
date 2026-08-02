/**
 * Root template: remounts on every navigation, so the wrapper replays a
 * subtle fade+rise transition for each page change.
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-fade-slide">{children}</div>;
}
