import type { User } from "../api/authAPI";

export interface AuthSliceState {
  user: User | null;
  token: string | null;
}
