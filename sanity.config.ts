import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { newsPostSchema } from "./src/lib/sanity/schema";

export default defineConfig({
  name: "anfassc-studio",
  title: "ANFASSC Content Studio",
  projectId: "j3wv3ai3",
  dataset: "production",
  apiVersion: "2024-01-01",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [newsPostSchema],
  },
});