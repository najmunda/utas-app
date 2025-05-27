const BASE_URL = 'https://forum-api.dicoding.dev/v1';

// USERS
export function setToken(token) {
  localStorage.setItem('utas-token', token);
}

export function getToken() {
  return localStorage.getItem('utas-token');
}

export async function authedFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

export async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { token } = data;
    return token;
  }
}

export async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { user } = data;
    return user;
  }
}

export async function getOwnProfile() {
  const response = await authedFetch(`${BASE_URL}/users/me`);

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { user } = data;
    return user;
  }
}

export async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { users } = data;
    return users;
  }
}

// Threads
export async function getThreads() {
  const response = await fetch(`${BASE_URL}/threads`);

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { threads } = data;
    return threads;
  }
}

export async function createThread({ title, body, category }) {
  const response = await authedFetch(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body, category }),
  });

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { thread } = data;
    return thread;
  }
}

export async function getThreadDetail(threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}`);

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const threadDetail = data.detailThread;
    return threadDetail;
  }
}

// COMMENTS
export async function createComment(threadId, content) {
  const response = await authedFetch(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { comment } = data;
    return comment;
  }
}

// VOTES
export async function upvoteThread(threadId) {
  const response = await authedFetch(`${BASE_URL}/threads/${threadId}/up-vote`, {
    method: 'POST',
  });

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { vote } = data;
    return vote;
  }
}

export async function downvoteThread(threadId) {
  const response = await authedFetch(`${BASE_URL}/threads/${threadId}/down-vote`, {
    method: 'POST',
  });

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { vote } = data;
    return vote;
  }
}

export async function unvoteThread(threadId) {
  const response = await authedFetch(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
    method: 'POST',
  });

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { vote } = data;
    return vote;
  }
}

export async function upvoteComment(threadId, commentId) {
  const response = await authedFetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    {
      method: 'POST',
    },
  );

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { vote } = data;
    return vote;
  }
}

export async function downvoteComment(threadId, commentId) {
  const response = await authedFetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    {
      method: 'POST',
    },
  );

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { vote } = data;
    return vote;
  }
}

export async function unvoteComment(threadId, commentId) {
  const response = await authedFetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {
      method: 'POST',
    },
  );

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { vote } = data;
    return vote;
  }
}

// LEADERBOARDS
export async function getLeaderboards() {
  const response = await fetch(`${BASE_URL}/leaderboards`);

  const { status, message, data } = await response.json();

  if (status !== 'success') {
    throw new Error(message);
  } else {
    const { leaderboards } = data;
    return leaderboards;
  }
}
