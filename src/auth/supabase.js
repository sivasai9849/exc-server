const { createClient } = require('@supabase/supabase-js');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');


require('dotenv').config();

async function initialize_supabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    return supabase;
}

async function signUp(email, password) {
  try {
    const supabase = await initialize_supabase();
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return user;
  } catch (error) {
    throw new Error('Failed to sign up: ' + error.message);
  }
}

async function verifyIdToken(idToken) {
  try {
    const supabase = await initialize_supabase();
    if (idToken.startsWith('Bearer ')) {
      idToken = idToken.split('Bearer ')[1];
    }
    const user = await supabase.auth.getUser(idToken);
    if (user.error){
      throw new Error(user.error.message);
    }
    return user.data.user;
  } catch (error) {
    throw new Error('Failed to verify id token: ' + error.message);
  }
}


async function checkAuth(request){
    const token = request.headers['authorization'] || 'incorrect token format';
    const user = await verifyIdToken(token);
    return user.id;
}

async function signIn(email, password) {
  try {
    const supabase = await initialize_supabase();
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return user;
  } catch (error) {
    throw new Error('Failed to sign in: ' + error.message);
  }
}

async function signOut() {
  try {
    const supabase = await initialize_supabase();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return true;
  } catch (error) {
    throw new Error('Failed to sign out: ' + error.message);
  }
}

async function getUser() {
    try {
        const supabase = await initialize_supabase();
        const user = supabase.auth.getUser();
    
        if (!user) {
        throw new Error('User not found');
        }
    
        return user;
    } catch (error) {
        throw new Error('Failed to get user: ' + error.message);
    }
    }


module.exports = {
  signUp,
  signIn,
  signOut,
  getUser,
  checkAuth
};