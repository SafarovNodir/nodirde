// Get all messages (for admin panel)
export async function onRequestGet(context) {
  try {
    const { request, env } = context;
    
    console.log('Admin panel request');
    console.log('DB binding:', env.DB ? 'available' : 'missing');
    
    // Check authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Unauthorized' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const token = authHeader.slice(7);
    const expectedToken = '004004';
    
    console.log('Received token:', token);
    console.log('Expected token:', expectedToken);
    console.log('Match:', token === expectedToken);
    
    if (token !== expectedToken) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid token. Received: ' + token 
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get all messages from D1
    const { results } = await env.DB.prepare(
      `SELECT * FROM messages ORDER BY timestamp DESC`
    ).all();
    
    return new Response(JSON.stringify({ 
      success: true, 
      messages: results 
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Get messages error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Serverda xatolik yuz berdi: ' + error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Mark message as read
export async function onRequestPut(context) {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Message ID required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check authorization
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Unauthorized' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const token = authHeader.slice(7);
    if (token !== '004004') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid token' 
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    await env.DB.prepare(
      `UPDATE messages SET read = 1 WHERE id = ?`
    ).bind(id).run();
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Message marked as read' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Update message error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Serverda xatolik yuz berdi' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Delete message
export async function onRequestDelete(context) {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Message ID required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check authorization
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Unauthorized' 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const token = authHeader.slice(7);
    if (token !== '004004') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid token' 
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    await env.DB.prepare(
      `DELETE FROM messages WHERE id = ?`
    ).bind(id).run();
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Message deleted' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Delete message error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Serverda xatolik yuz berdi' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// CORS handling
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
