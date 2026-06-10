let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 2, name: 'Bob', email: 'bob@example.com', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

let nextId = 4;

export const getAll = (req, res) => {
  res.json({ ok: true, data: users, message: 'Users retrieved', errors: [] });
};

export const getById = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ ok: false, data: null, message: 'User not found', errors: [] });
  }
  res.json({ ok: true, data: user, message: 'User retrieved', errors: [] });
};

export const create = (req, res) => {
  const now = new Date().toISOString();
  const user = { id: nextId++, ...req.body, createdAt: now, updatedAt: now };
  users.push(user);
  res.status(201).json({ ok: true, data: user, message: 'User created', errors: [] });
};

export const update = (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ ok: false, data: null, message: 'User not found', errors: [] });
  }
  users[index] = { ...users[index], ...req.body, updatedAt: new Date().toISOString() };
  res.json({ ok: true, data: users[index], message: 'User updated', errors: [] });
};

export const remove = (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ ok: false, data: null, message: 'User not found', errors: [] });
  }
  const deleted = users.splice(index, 1)[0];
  res.json({ ok: true, data: deleted, message: 'User deleted', errors: [] });
};
