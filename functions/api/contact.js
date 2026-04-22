// Contact form submission endpoint
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    console.log('Contact form submitted');
    console.log('DB binding:', env.DB ? 'available' : 'missing');
    
    // Parse form data
    const formData = await request.formData();
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email') || '';
    const type = formData.get('type');
    const message = formData.get('message');
    
    // Validation
    if (!name || !phone || !type || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Barcha majburiy maydonlarni to\'ldiring' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check honeypot (bot protection)
    const botField = formData.get('bot-field');
    if (botField) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Spam detected' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Insert into D1 database
    const timestamp = new Date().toISOString();
    const read = 0; // unread
    
    await env.DB.prepare(
      `INSERT INTO messages (name, phone, email, type, message, timestamp, read) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(name, phone, email, type, message, timestamp, read).run();
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Xabar muvaffaqiyatli yuborildi' 
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Serverda xatolik yuz berdi: ' + error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// CORS handling for OPTIONS requests
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
