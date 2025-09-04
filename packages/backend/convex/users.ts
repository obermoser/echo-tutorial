import { mutation, query } from "./_generated/server.js";

export const getMany = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

export const add = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const orgId = identity?.orgId as string;

    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    if (identity === null) {
      throw new Error("Not authenticated!");
    }
    const user = await ctx.db.insert("users", {
      name: "Test User",
    });

    return user;
  },
});
