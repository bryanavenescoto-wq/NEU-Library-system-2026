import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://httlikeizzvdqahvseyp.supabase.co";
const supabaseKey = "sb_publishable_xxxxx"; // paste your key here

export const supabase = createClient(supabaseUrl, supabaseKey);