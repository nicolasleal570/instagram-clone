import { useContext } from 'react';
import { PostContext, PostContextType } from '../contexts/PostContext';

export function usePost() {
  return useContext(PostContext) as PostContextType;
}
