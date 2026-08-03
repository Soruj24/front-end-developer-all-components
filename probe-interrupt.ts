import {
  Annotation,
  Command,
  MemorySaver,
  START,
  StateGraph,
  interrupt,
  isInterrupted,
} from "@langchain/langgraph";

const A = Annotation.Root({
  v: Annotation({ reducer: (c: unknown, u: unknown) => u ?? c }),
});

const node = async () => {
  const r = interrupt({ hello: "world" });
  return { v: r };
};

async function main() {
  const g = new StateGraph(A).addNode("n", node).addEdge(START, "n").compile({
    checkpointer: new MemorySaver(),
  });
  const cfg = { configurable: { thread_id: "t1" } };

  const s = await g.stream({}, cfg);
  for await (const u of s) {
    console.log("UPDATE", JSON.stringify(u), "interrupted?", isInterrupted(u));
  }
  const st = await g.getState(cfg);
  console.log("STATE_TASKS", JSON.stringify(st.tasks.map((t) => t.interrupts)));

  const s2 = await g.stream(new Command({ resume: { approved: true } }), cfg);
  for await (const u of s2) {
    console.log("RESUME_UPDATE", JSON.stringify(u));
  }
  const st2 = await g.getState(cfg);
  console.log("FINAL_V", JSON.stringify(st2.values));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
