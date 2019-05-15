import { body } from 'express-validator/check';

export function UserValidation() {
  return [body('username', 'username.required').exists()];
}
