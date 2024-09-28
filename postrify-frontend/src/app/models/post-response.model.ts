import { UserDTO } from './user-dto.model';

export interface PostResponseDTO {
  id: number;
  title: string;
  content: string;
  user: UserDTO;
  createdAt: string;
  updatedAt: string;
}
