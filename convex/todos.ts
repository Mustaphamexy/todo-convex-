// convex/todos.ts

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Query to get all todos sorted by order
export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db
      .query("todos")
      .withIndex("by_order")
      .collect();
    
    return todos.sort((a, b) => a.order - b.order);
  },
});

// Query to get a single todo by ID
export const getTodoById = query({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation to create a new todo
export const createTodo = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Get the highest order number
    const todos = await ctx.db.query("todos").collect();
    const maxOrder = todos.length > 0 
      ? Math.max(...todos.map(t => t.order)) 
      : 0;
    
    const todoId = await ctx.db.insert("todos", {
      title: args.title,
      description: args.description,
      dueDate: args.dueDate,
      completed: false,
      order: maxOrder + 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    return todoId;
  },
});

// Mutation to update a todo
export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    completed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
    
    return id;
  },
});

// Mutation to delete a todo
export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Mutation to reorder todos
export const reorderTodos = mutation({
  args: {
    todoId: v.id("todos"),
    newOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.todoId, {
      order: args.newOrder,
      updatedAt: Date.now(),
    });
  },
});

// Mutation to toggle todo completion
export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    
    await ctx.db.patch(args.id, {
      completed: !todo.completed,
      updatedAt: Date.now(),
    });
    
    return args.id;
  },
});

// Mutation to clear all completed todos
export const clearCompleted = mutation({
  handler: async (ctx) => {
    const completedTodos = await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("completed"), true))
      .collect();
    
    for (const todo of completedTodos) {
      await ctx.db.delete(todo._id);
    }
    
    return completedTodos.length;
  },
});