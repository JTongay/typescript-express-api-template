import * as supertest from 'supertest';
import { app } from '@/index';
import 'jest';
import { User } from '@/models';

export async function cleanupUser(): Promise<void> {
  await User.findOneAndRemove({ username: 'joejoe' });
}
