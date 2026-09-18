// Fill these in with your Supabase project's values
// (Project Settings -> API in your Supabase dashboard)
const SUPABASE_URL = 'https://vbdbgqcufibzhrucdhfg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_MTeu6MK8m2y9u53sPx-hxQ_rNIoXDg3';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
