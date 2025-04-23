import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', dob: '', address: ''
  });

const fetchUsers = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/users');
    const formattedUsers = res.data.map(user => ({
      ...user,
      dob: user.dob ? new Date(new Date(user.dob).getTime() - (new Date(user.dob).getTimezoneOffset() * 60000)).toISOString().split('T')[0] : ''
    }));
    setUsers(formattedUsers);
  } catch (err) {
    console.error('Failed to fetch users:', err);
  }
};


  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({ ...user });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editId}`, form);
      setEditId(null);
      setForm({ name: '', email: '', phone: '', dob: '', address: '' });
      fetchUsers();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">👤 Registered Users</h2>

      
      <div className="table-responsive d-none d-md-block shadow-sm rounded border">
        <table className="table table-hover table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>DOB</th><th>Address</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                {editId === user.id ? (
                  <>
                    <td><input className="form-control form-control-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></td>
                    <td><input className="form-control form-control-sm" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></td>
                    <td><input className="form-control form-control-sm" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></td>
                    <td><input type="date" className="form-control form-control-sm" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} /></td>
                    <td><input className="form-control form-control-sm" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></td>
                    <td>
                      <div className="d-flex flex-wrap gap-1 justify-content-center">
                        <button className="btn btn-success btn-sm" onClick={handleUpdate}><i className="bi bi-check-circle-fill"></i> Save</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}><i className="bi bi-x-circle-fill"></i> Cancel</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.dob}</td>
                    <td>{user.address}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-1 justify-content-center">
                        <button className="btn btn-warning btn-sm" onClick={() => handleEdit(user)}><i className="bi bi-pencil-square"></i> Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}><i className="bi bi-trash-fill"></i> Delete</button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARD VIEW (Mobile) */}
      <div className="d-block d-md-none">
        {users.map(user => (
          <div key={user.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              {editId === user.id ? (
                <>
                  <input className="form-control mb-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
                  <input className="form-control mb-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
                  <input className="form-control mb-2" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
                  <input type="date" className="form-control mb-2" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
                  <input className="form-control mb-2" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" />
                  <div className="d-flex gap-2 justify-content-end mt-2">
                    <button className="btn btn-success btn-sm" onClick={handleUpdate}><i className="bi bi-check-circle-fill"></i> Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}><i className="bi bi-x-circle-fill"></i> Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="card-title mb-1">{user.name}</h5>
                  <p className="card-text mb-1"><strong>Email:</strong> {user.email}</p>
                  <p className="card-text mb-1"><strong>Phone:</strong> {user.phone}</p>
                  <p className="card-text mb-1"><strong>DOB:</strong> {user.dob}</p>
                  <p className="card-text"><strong>Address:</strong> {user.address}</p>
                  <div className="d-flex gap-2 justify-content-end">
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(user)}><i className="bi bi-pencil-square"></i> Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}><i className="bi bi-trash-fill"></i> Delete</button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersTable;
