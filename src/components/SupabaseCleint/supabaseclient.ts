import { createClient } from '@supabase/supabase-js';
const URL = import.meta.env.VITE_APP_API_URL;
const SERVICE_ROLE = import.meta.env.VITE_APP_API_KEY;
const supabase = createClient(URL, SERVICE_ROLE);

export default supabase;
