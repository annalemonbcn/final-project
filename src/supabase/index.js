import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fwikyrjwpjdyhktadajk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3aWt5cmp3cGpkeWhrdGFkYWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4NDAwNjcsImV4cCI6MTk5NzQxNjA2N30.Ar7sAbmojgP3CnUIV-lXvq8ifYh3OSp5AoQmxzdhcVQ'
export default createClient(supabaseUrl, supabaseKey)