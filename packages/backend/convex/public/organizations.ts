import { v } from "convex/values";
import { action, mutation } from "../_generated/server.js";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export const validate = mutation({
  args: {
    organizationId: v.string(),
  },
  handler: async (_, args) => {
    try {
      await clerkClient.organizations.getOrganization({
        organizationId: args.organizationId,
      });
      return { valid: true };
    } catch (error) {return {valid: false, reason: "Organization not found"}}
  },
});
