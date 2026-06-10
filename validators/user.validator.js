import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email format'),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email('Invalid email format').optional(),
}).refine(data => data.name || data.email, {
  message: 'At least one field (name or email) must be provided',
});
