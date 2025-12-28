import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

/*
*    "Owner": "Cristina",
    "Total_Books": "321",
    "To_Read": "102",
    "Already_Read": "209",
    "Reading": "10",
    "Percentage_Read": "65.11"
*
*
*
* */

export interface Config {
  Owner: string;
  Total_Books: string;
  To_Read: string;
  Already_Read: string;
  Reading: string;
  Percentage_Read: string;
}

const ConfigSchema = z.array(
  z.object({
    Owner: z.string(),
    Total_Books: z.string(),
    To_Read: z.string(),
    Already_Read: z.string(),
    Reading: z.string(),
    Percentage_Read: z.string(),
  }),
);

async function fetchStats(): Promise<Array<Config>> {
  const res = await axios.get('/api/stats');
  return ConfigSchema.parse(res.data);
}

export function useStats() {
  return useQuery<Array<Config>>({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });
}
