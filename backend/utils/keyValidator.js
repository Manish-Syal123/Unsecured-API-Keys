const axios = require("axios");

async function validate_openai_key(key) {
  try {
    const resp = await axios.get("https://api.openai.com/v1/models", {
      headers: { Authorization: `Bearer ${key}` },
      timeout: 5000,
    });
    return resp.status === 200;
  } catch {
    return false;
  }
}

async function validate_googleai_key(key) {
  // GoogleAI API key validation is not straightforward; we'll check a public endpoint
  try {
    const resp = await axios.get(
      `https://generativelanguage.googleapis.com/v1/models?key=${key}`,
      { timeout: 5000 }
    );
    // If the key is valid, we get a 200 or 400 (invalid argument), but 403/401 means invalid key
    return resp.status === 200 || resp.status === 400;
  } catch (err) {
    if (
      err.response &&
      (err.response.status === 400 || err.response.status === 200)
    )
      return true;
    return false;
  }
}

async function validate_huggingface_key(key) {
  try {
    const resp = await axios.get("https://api.huggingface.co/me", {
      headers: { Authorization: `Bearer ${key}` },
      timeout: 5000,
    });
    return resp.status === 200;
  } catch {
    return false;
  }
}

async function validate_replicate_key(key) {
  try {
    const resp = await axios.get("https://api.replicate.com/v1/account", {
      headers: { Authorization: `Token ${key}` },
      timeout: 5000,
    });
    return resp.status === 200;
  } catch {
    return false;
  }
}

async function validate_stabilityai_key(key) {
  try {
    const resp = await axios.get("https://api.stability.ai/v1/user/account", {
      headers: { Authorization: `Bearer ${key}` },
      timeout: 5000,
    });
    return resp.status === 200;
  } catch {
    return false;
  }
}

module.exports = {
  validate_openai_key,
  validate_googleai_key,
  validate_huggingface_key,
  validate_replicate_key,
  validate_stabilityai_key,
};
