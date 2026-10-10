import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const entities = {
  Students: {
    url: 'students',
    fields: [
      'name',
      'email',
      'mobile',
      'parentMobile',
      'address',
      'studentType',
      'admissionDate',
      'courseStartDate',
      'courseEndDate',
      'totalFee',
      'time',
      'year',
      'status',
    ],
  },
  Faculty: { url: 'faculty', fields: ['name', 'email', 'mobile', 'experience', 'expertise', 'salary'] },
  Courses: { url: 'courses', fields: ['name', 'duration', 'fee', 'isProgrammingCourse', 'isNormalCourse'] },
  Fees: { url: 'fees', fields: ['studentName', 'amount', 'date', 'time', 'collectorName'] },
  Attendance: { url: 'attendance', fields: ['studentName', 'date', 'time', 'status'] },
  'Salary Paid': { url: 'salary-paid', fields: ['facultyName', 'month', 'date', 'time', 'year', 'amount', 'status'] },
};
const auth = (token) => ({ Authorization: `Bearer ${token}` });

export default function EntityWorkspace({ entity, token, head }) {
  const cfg = entities[entity];
  const [rows, setRows] = useState([]),
    [related, setRelated] = useState({});
  const [error, setError] = useState(''),
    [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null),
    [saving, setSaving] = useState(false);
  const [form, setForm] = useState({}),
    [period, setPeriod] = useState('monthly');
  const refresh = useCallback(async () => {
    setError('');
    try {
      const { data } = await axios.get(`${API}/${cfg.url}`, { headers: auth(token) });
      setRows(data.items || data);
      const requests = [];
      if (['Students', 'Fees', 'Attendance'].includes(entity))
        requests.push(axios.get(`${API}/students`, { headers: auth(token) }).then((r) => ({ students: r.data.items })));
      if (['Students', 'Salary Paid', 'Fees'].includes(entity))
        requests.push(axios.get(`${API}/faculty`, { headers: auth(token) }).then((r) => ({ faculty: r.data.items })));
      if (entity === 'Students')
        requests.push(axios.get(`${API}/courses`, { headers: auth(token) }).then((r) => ({ courses: r.data.items })));
      if (requests.length) setRelated(Object.assign({}, ...(await Promise.all(requests))));
    } catch (e) {
      setError(e.response?.data?.message || 'Could not load this branch data.');
    }
  }, [cfg.url, entity, token]);
  useEffect(() => {
    refresh();
  }, [refresh]);
  function startAdd() {
    setEditing(null);
    setForm({});
    setOpen(true);
  }
  function startEdit(row) {
    const value = { ...row };
    if (row.student) value.studentChoice = row.student._id;
    if (row.faculty) value.facultyChoice = row.faculty._id;
    if (row.collector) value.collector = row.collector._id;
    if (row.teachingFaculty) value.teachingFaculty = row.teachingFaculty._id;
    if (row.courses) value.courses = row.courses.map((course) => course._id);
    setEditing(row);
    setForm(value);
    setOpen(true);
  }
  async function save(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form };
      ['search', 'studentChoice', 'facultyChoice', 'collectorName'].forEach((key) => {
        if (key === 'collectorName' && entity === 'Fees') return;
        delete payload[key];
      });
      Object.keys(payload).forEach((key) => {
        if (payload[key] === '') delete payload[key];
      });
      ['fee', 'totalFee', 'salary', 'amount', 'experience', 'year'].forEach((key) => {
        if (payload[key] !== undefined) payload[key] = Number(payload[key]);
      });
      ['isProgrammingCourse', 'isNormalCourse'].forEach((key) => {
        if (payload[key] !== undefined) payload[key] = payload[key] === 'true' || payload[key] === true;
      });
      if (['Fees', 'Attendance'].includes(entity)) payload.student = form.studentChoice;
      if (entity === 'Salary Paid') payload.faculty = form.facultyChoice;
      if (entity === 'Fees' && form.collector) payload.collector = form.collector;
      if (entity === 'Students' && !form.aadhaarNumber) delete payload.aadhaarNumber;
      const url = `${API}/${cfg.url}${editing ? `/${editing._id}` : ''}`;
      if (editing) await axios.patch(url, payload, { headers: auth(token) });
      else await axios.post(url, payload, { headers: auth(token) });
      setOpen(false);
      setEditing(null);
      setForm({});
      await refresh();
    } catch (e) {
      setError(e.response?.data?.message || 'Could not save record. Check required fields.');
    } finally {
      setSaving(false);
    }
  }
  async function remove(id) {
    if (!confirm('Delete this record? This action cannot be undone.')) return;
    try {
      await axios.delete(`${API}/${cfg.url}/${id}`, { headers: auth(token) });
      await refresh();
    } catch (e) {
      setError(e.response?.data?.message || 'Could not delete record.');
    }
  }
  async function download() {
    try {
      const { data } = await axios.get(`${API}/reports/${cfg.url}?period=${period}`, { headers: auth(token) });
      const columns = cfg.fields.filter((field) => field !== 'aadhaarNumber');
      const cell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
      const value = (row, key) =>
        key === 'studentName' ? row.student?.name : key === 'facultyName' ? row.faculty?.name : row[key];
      const content = [
        columns.map(cell).join(','),
        ...(data.items || []).map((row) => columns.map((key) => cell(value(row, key))).join(',')),
      ].join('\r\n');
      const link = document.createElement('a'),
        url = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
      link.href = url;
      link.download = `elevate-${cfg.url}-${period}-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e.response?.data?.message || 'Could not generate the report.');
    }
  }
  const visible = rows.filter(
    (row) =>
      !form.search ||
      String(row.name || row.student?.name || row.faculty?.name || '')
        .toLowerCase()
        .includes(form.search.toLowerCase()),
  );
  const recordName = (row) => row.name || row.student?.name || row.faculty?.name || 'Payment record';
  const statusOptions =
    entity === 'Students'
      ? ['todo', 'inprogress', 'leave', 'discontinue', 'completed']
      : entity === 'Attendance'
        ? ['present', 'absent', 'late']
        : ['pending', 'completed'];
  function field(label, key, type = 'text', required = false) {
    return (
      <label key={key}>
        {label}
        {required ? ' *' : ''}
        <input
          required={required && !editing}
          type={type}
          value={form[key] ? String(form[key]).slice(0, type === 'date' ? 10 : undefined) : ''}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={label}
        />
      </label>
    );
  }
  return (
    <section className="workspace">
      <div className="workspace-head">
        <div>
          <span className="eyebrow">BRANCH MANAGEMENT</span>
          <h2>
            {entity} <em>records.</em>
          </h2>
          <p>
            Manage {entity.toLowerCase()} for {head?.branch?.name || 'your branch'}.
          </p>
        </div>
        <div className="workspace-actions">
          <select aria-label="Report period" value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="daily">Daily report</option>
            <option value="weekly">Weekly report</option>
            <option value="monthly">Monthly report</option>
            <option value="yearly">Yearly report</option>
          </select>
          <button className="button button-quiet export-btn" onClick={download}>
            ↓ Download CSV
          </button>
          <button className="button button-primary" onClick={startAdd}>
            + Add {entity === 'Salary Paid' ? 'salary record' : entity.slice(0, -1)}
          </button>
        </div>
      </div>
      {error && <div className="api-notice">{error}</div>}
      <div className="data-toolbar">
        <div>
          Showing <b>{visible.length}</b> {entity.toLowerCase()}
          <span> · Branch-scoped data</span>
        </div>
        <input
          placeholder={`Search ${entity.toLowerCase()}…`}
          value={form.search || ''}
          onChange={(e) => setForm({ ...form, search: e.target.value })}
        />
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>RECORD</th>
              {cfg.fields
                .filter((f) => !['name', 'studentName', 'facultyName'].includes(f))
                .slice(0, 5)
                .map((f) => (
                  <th key={f}>{f.replace(/([A-Z])/g, ' $1').toUpperCase()}</th>
                ))}
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row._id}>
                <td>
                  <div className="record-name">
                    <span>{recordName(row).slice(0, 1).toUpperCase()}</span>
                    <b>{recordName(row)}</b>
                  </div>
                </td>
                {cfg.fields
                  .filter((f) => !['name', 'studentName', 'facultyName'].includes(f))
                  .slice(0, 5)
                  .map((f) => (
                    <td key={f}>{row[f] instanceof Object ? JSON.stringify(row[f]) : (row[f] ?? '—')}</td>
                  ))}
                <td>
                  <button className="edit-row" onClick={() => startEdit(row)} aria-label="Edit record">
                    ✎
                  </button>{' '}
                  <button className="delete-row" onClick={() => remove(row._id)} aria-label="Delete record">
                    ×
                  </button>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} className="empty-state">
                  <span>✳</span>
                  <b>No {entity.toLowerCase()} yet</b>
                  <small>Records you add for this branch will appear here.</small>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="report-tip">
        <span>✳</span>
        <p>Choose a report period and download this branch's {entity.toLowerCase()} as a CSV file.</p>
      </div>
      {open && (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <form className="record-modal" onSubmit={save}>
            <button className="modal-close" type="button" onClick={() => setOpen(false)}>
              ×
            </button>
            <span className="course-eyebrow">BRANCH RECORD</span>
            <h3>
              {editing ? 'Edit' : 'Add'} {entity === 'Salary Paid' ? 'salary record' : entity.slice(0, -1)}
            </h3>
            <p>Fields with * are required.</p>
            <div className="modal-fields">
              {cfg.fields
                .filter(
                  (key) =>
                    ![
                      'studentName',
                      'facultyName',
                      'teachingFaculty',
                      'courses',
                      'aadhaarNumber',
                      'collectorName',
                      'paidFee',
                      'balanceFee',
                    ].includes(key),
                )
                .map((key) =>
                  key === 'status' ? (
                    <label key={key}>
                      Status
                      <select
                        value={
                          form.status ||
                          (entity === 'Students' ? 'todo' : entity === 'Attendance' ? 'present' : 'pending')
                        }
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                      >
                        {statusOptions.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                  ) : ['isProgrammingCourse', 'isNormalCourse'].includes(key) ? (
                    <label key={key}>
                      {key}
                      <select
                        value={String(form[key] ?? false)}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </label>
                  ) : (
                    field(
                      key.replace(/([A-Z])/g, ' $1'),
                      key,
                      ['date', 'admissionDate', 'courseStartDate', 'courseEndDate'].includes(key)
                        ? 'date'
                        : ['email'].includes(key)
                          ? 'email'
                          : ['fee', 'totalFee', 'salary', 'amount', 'experience', 'year'].includes(key)
                            ? 'number'
                            : 'text',
                      ['name', 'duration', 'fee', 'mobile', 'month', 'amount'].includes(key),
                    )
                  ),
                )}
              {['Fees', 'Attendance'].includes(entity) && (
                <label>
                  Student *
                  <select
                    required
                    value={form.studentChoice || ''}
                    onChange={(e) => setForm({ ...form, studentChoice: e.target.value })}
                  >
                    <option value="">Select a student</option>
                    {related.students?.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} · {s.mobile}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {entity === 'Fees' && (
                <label>
                  Collected by faculty
                  <select
                    value={form.collector || ''}
                    onChange={(e) => setForm({ ...form, collector: e.target.value })}
                  >
                    <option value="">Select collector</option>
                    {related.faculty?.map((f) => (
                      <option key={f._id} value={f._id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {entity === 'Salary Paid' && (
                <label>
                  Faculty *
                  <select
                    required
                    value={form.facultyChoice || ''}
                    onChange={(e) => setForm({ ...form, facultyChoice: e.target.value })}
                  >
                    <option value="">Select faculty</option>
                    {related.faculty?.map((f) => (
                      <option key={f._id} value={f._id}>
                        {f.name} · {f.mobile}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {entity === 'Students' && (
                <>
                  <label>
                    Teaching faculty
                    <select
                      value={form.teachingFaculty || ''}
                      onChange={(e) => setForm({ ...form, teachingFaculty: e.target.value })}
                    >
                      <option value="">Not assigned</option>
                      {related.faculty?.map((f) => (
                        <option key={f._id} value={f._id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Courses (select one or more)
                    <select
                      multiple
                      value={form.courses || []}
                      onChange={(e) => setForm({ ...form, courses: [...e.target.selectedOptions].map((o) => o.value) })}
                    >
                      {related.courses?.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name} · ₹{c.fee}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Aadhaar number
                    <input
                      type="password"
                      autoComplete="off"
                      value={form.aadhaarNumber || ''}
                      onChange={(e) => setForm({ ...form, aadhaarNumber: e.target.value })}
                      placeholder={editing ? 'Leave blank to keep existing' : 'Optional'}
                    />
                  </label>
                  <p className="form-hint">Total fee is calculated from selected courses. You can adjust it above.</p>
                </>
              )}
            </div>
            {error && <p className="form-error">{error}</p>}
            <button className="button button-primary" disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Update record' : 'Save record'} <ArrowRight size={15} />
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
