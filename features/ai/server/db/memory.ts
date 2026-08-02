import { connectDb } from "@/features/registry/server/connect";
import type { Conversation } from "../../types";
import type { MemoryStore } from "../memory";
import { ConversationModel, type ConversationDoc } from "./models";

export class MongoMemoryStore implements MemoryStore {
  async get(conversationId: string): Promise<Conversation | undefined> {
    await connectDb();
    const doc = await ConversationModel.findById(conversationId).lean();
    return doc ? toConversation(doc as unknown as ConversationDoc) : undefined;
  }

  async save(conversation: Conversation): Promise<void> {
    await connectDb();
    await ConversationModel.findByIdAndUpdate(
      conversation.id,
      { $set: { ...toDoc(conversation), _id: conversation.id } },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }

  async list(limit = 50): Promise<Conversation[]> {
    await connectDb();
    const docs = await ConversationModel.find().sort({ updatedAt: -1 }).limit(limit).lean();
    return (docs as unknown as ConversationDoc[]).map(toConversation);
  }

  async delete(conversationId: string): Promise<void> {
    await connectDb();
    await ConversationModel.findByIdAndDelete(conversationId);
  }

  async clear(): Promise<void> {
    await connectDb();
    await ConversationModel.deleteMany({});
  }
}

function toDoc(conversation: Conversation): Omit<ConversationDoc, "_id"> {
  return {
    title: conversation.title,
    messages: conversation.messages,
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
    metadata: conversation.metadata,
  };
}

function toConversation(doc: ConversationDoc): Conversation {
  return {
    id: doc._id,
    title: doc.title,
    messages: doc.messages,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    metadata: doc.metadata,
  };
}
