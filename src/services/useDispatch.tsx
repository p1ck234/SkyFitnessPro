import { useDispatch as useReduxDispatch } from 'react-redux';
import type { AppDispatch } from '@/store/store';

export const useDispatch = () => useReduxDispatch<AppDispatch>();