const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    if (!ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ valid: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { image_base64, media_type } = await req.json()

    if (!image_base64) {
      return new Response(JSON.stringify({ valid: false, reason: 'No image provided.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: media_type || 'image/jpeg', data: image_base64 },
            },
            {
              type: 'text',
              text: `You are validating a headshot photo for a tutoring company's website. Respond with a JSON object only, no other text.

Check:
1. Is there exactly one real human face clearly visible?
2. Is the photo appropriate and professional (no offensive content, memes, cartoons, AI-generated faces, or objects instead of a person)?
3. Is the face reasonably clear (not extremely blurry or tiny)?

Respond ONLY with: {"valid": true} or {"valid": false, "reason": "<brief reason>"}`,
            },
          ],
        }],
      }),
    })

    if (!res.ok) {
      // If AI is down, allow through
      return new Response(JSON.stringify({ valid: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const data = await res.json()
    const text = data.content?.[0]?.text || ''

    try {
      const match = text.match(/\{[\s\S]*\}/)
      const result = JSON.parse(match ? match[0] : text)
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } catch {
      return new Response(JSON.stringify({ valid: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
  } catch (e) {
    return new Response(JSON.stringify({ valid: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
