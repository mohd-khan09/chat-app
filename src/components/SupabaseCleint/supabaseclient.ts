import { createClient } from '@supabase/supabase-js';
const URL = import.meta.env.VITE_APP_API_URL;
const ANONKEY = import.meta.env.VITE_APP_API_KEY;
const supabase = createClient(URL, ANONKEY);

export default supabase;
