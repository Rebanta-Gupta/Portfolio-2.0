import { useEffect, useRef, useState } from 'react';

export type CursorVariant = 'default' | 'hover' | 'text' | 'drag' | 'hidden';

export function useCursorState() {
  const [variant, setVariant] = useState<CursorVariant>('default');

  return { variant, setVariant };
}