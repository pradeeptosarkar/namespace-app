import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

interface PendingRegistrationResponse {
  id: string
  registered_at: string
  event_id: string
  user_id: string
  event_name: string
  event_date: string
  event_venue: string
  user_name: string
  user_email: string
  user_phone: string
  user_college: string
  user_degree: string
  user_graduation_year: number
  user_skills: string[]
  github_url: string
  linkedin_url: string
  leetcode_url: string
}

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Fetch pending registrations
    const { data: registrations, error: regError } = await supabase
      .from('registrations')
      .select('id, registered_at, event_id, user_id, status')
      .eq('status', 'pending')
      .order('registered_at', { ascending: false })

    if (regError) {
      console.error('Error fetching registrations:', regError)
      return new Response(JSON.stringify({ error: regError.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    if (!registrations || registrations.length === 0) {
      return new Response(JSON.stringify({ data: [] as PendingRegistrationResponse[] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const eventIds = Array.from(new Set(registrations.map((r) => r.event_id)))
    const userIds = Array.from(new Set(registrations.map((r) => r.user_id)))

    const [eventsRes, profilesRes] = await Promise.all([
      supabase.from('events').select('id, name, date, venue').in('id', eventIds),
      supabase
        .from('profiles')
        .select('id, full_name, email, phone_number, college, degree, graduation_year, skills, github_url, linkedin_url, leetcode_url')
        .in('id', userIds),
    ])

    if (eventsRes.error) {
      console.error('Error fetching events:', eventsRes.error)
      return new Response(JSON.stringify({ error: eventsRes.error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    if (profilesRes.error) {
      console.error('Error fetching profiles:', profilesRes.error)
      return new Response(JSON.stringify({ error: profilesRes.error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const eventsMap = new Map((eventsRes.data || []).map((e) => [e.id, e]))
    const profilesMap = new Map((profilesRes.data || []).map((p) => [p.id, p]))

    const result: PendingRegistrationResponse[] = registrations.map((reg) => ({
      id: reg.id,
      registered_at: reg.registered_at,
      event_id: reg.event_id,
      user_id: reg.user_id,
      event_name: eventsMap.get(reg.event_id)?.name ?? 'Unknown Event',
      event_date: eventsMap.get(reg.event_id)?.date ?? '',
      event_venue: eventsMap.get(reg.event_id)?.venue ?? '',
      user_name: profilesMap.get(reg.user_id)?.full_name ?? 'Unknown User',
      user_email: profilesMap.get(reg.user_id)?.email ?? '',
      user_phone: profilesMap.get(reg.user_id)?.phone_number ?? '',
      user_college: profilesMap.get(reg.user_id)?.college ?? '',
      user_degree: profilesMap.get(reg.user_id)?.degree ?? '',
      user_graduation_year: profilesMap.get(reg.user_id)?.graduation_year ?? 0,
      user_skills: profilesMap.get(reg.user_id)?.skills ?? [],
      github_url: profilesMap.get(reg.user_id)?.github_url ?? '',
      linkedin_url: profilesMap.get(reg.user_id)?.linkedin_url ?? '',
      leetcode_url: profilesMap.get(reg.user_id)?.leetcode_url ?? '',
    }))

    return new Response(JSON.stringify({ data: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (e) {
    console.error('Unhandled error in admin-pending-approvals:', e)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
})