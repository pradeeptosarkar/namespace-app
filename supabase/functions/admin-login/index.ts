import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { username, password } = await req.json();

    // Get admin credentials from environment (Supabase secrets)
    const adminUsername = Deno.env.get('ADMIN_USERNAME');
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');

    if (!adminUsername || !adminPassword) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Admin credentials not configured' 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate credentials
    if (username === adminUsername && password === adminPassword) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Admin login successful' 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid admin credentials' 
        }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});