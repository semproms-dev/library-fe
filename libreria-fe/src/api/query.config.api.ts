import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export interface Config {
  genre: string[];
  owner: string[];
  status: string[];
  location: string[];
}

const ConfigSchema = z.object({
  genre: z.array(z.string()),
  owner: z.array(z.string()),
  status: z.array(z.string()),
  location: z.array(z.string()),
});

async function fetchConfig(): Promise<Config> {
  const res = await axios.get('/api/config');
  return ConfigSchema.parse(res.data);
}

export function useConfig() {
  return useQuery<Config>({
    queryKey: ['config'],
    queryFn: fetchConfig,
  });
}
