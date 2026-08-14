// src/services/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dwldwqtkellwjjjxslth.supabase.co'
const supabaseKey = 'sb_publishable_NeV7rWh3Eh_5xWVFLoyPyg_x8mdsrRH'

export const supabase = createClient(supabaseUrl, supabaseKey)