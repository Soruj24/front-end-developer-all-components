import type { UseBentoGridCore } from "./useBentoGrid";

export function useReorder(core: UseBentoGridCore) {
  const reorder = (draggedId: string, targetId: string): string[] => {
    const currentIndex = core.order.indexOf(draggedId);
    const targetIndex = core.order.indexOf(targetId);
    if (currentIndex === -1 || targetIndex === -1) return core.orderRef.current;

    const newOrder = [...core.orderRef.current];
    const [removed] = newOrder.splice(currentIndex, 1);
    newOrder.splice(targetIndex, 0, removed);
    return newOrder;
  };

  return { reorder };
}
