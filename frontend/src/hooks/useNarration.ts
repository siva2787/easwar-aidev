import { useEffect, useState } from 'react';
import { narrationService } from '../services/narrationService';
import type { NarrationListenerState } from '../services/narrationService';

export function useNarration(): NarrationListenerState {
  const [s, setS] = useState(narrationService.getSnapshot());
  useEffect(() => narrationService.subscribe(setS), []);
  return s;
}
