import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [clientName, setClientName] = useState("");
  const handleSubmit = (e) => {
  e.preventDefault();
  if (
  !clientName ||
  !email ||
  !company ||
  !source ||
  !notes
) {
  alert("Please fill all fields");
  return;
}
  const newClient = {
    clientName,
    email,
    company,
    source,
    status,
    notes,
  };
  if (editIndex !== null) {
  const updatedClients = [...clients];

  updatedClients[editIndex] = newClient;

  setClients(updatedClients);

  setEditIndex(null);

} else {
  setClients([...clients, newClient]);
}

  setClientName("");
  setEmail("");
  setCompany("");
  setSource("");
  setStatus("New");
  setNotes("");
};
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("New");
  const [notes, setNotes] = useState("");
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState(() => {
  const savedClients = localStorage.getItem("clients");

  return savedClients ? JSON.parse(savedClients) : [];
});
useEffect(() => {
  localStorage.setItem("clients", JSON.stringify(clients));
}, [clients]);

  const [editIndex, setEditIndex] = useState(null);
  const handleDelete = (index) => {
  const updatedClients = clients.filter((client, i) => i !== index);

  setClients(updatedClients);
};
const handleEdit = (index) => {
  const client = clients[index];

  setClientName(client.clientName);
  setEmail(client.email);
  setCompany(client.company);
  setSource(client.source);
  setStatus(client.status);
  setNotes(client.notes);

  setEditIndex(index);
};

  return (
    <div>
      <nav className="navbar">
        <h2>Mini CRM</h2>

        <ul>
          <li>Home</li>
          <li>Clients</li>
          <li>Add Client</li>
        </ul>
      </nav>

      <div className="container">
        <form className="client-form"onSubmit={handleSubmit}>
    <input type="text" placeholder="Client Name"value={clientName}
  onChange={(e) => setClientName(e.target.value)} />
    <input type="email" placeholder="Email"value={email}
  onChange={(e) => setEmail(e.target.value)} />
    <input type="text" placeholder="Company"value={company}
  onChange={(e) => setCompany(e.target.value)} />
    <input type="text" placeholder="Lead Source"value={source}
  onChange={(e) => setSource(e.target.value)} />
  <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option value="New">New</option>
  <option value="Contacted">Contacted</option>
  <option value="Converted">Converted</option>
</select>
  <textarea
  placeholder="Enter Notes"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
></textarea>

    <button type="submit">{editIndex !== null ? "Update Client" : "Add Client"}</button>
  </form>

  <input
  type="text"
  placeholder="Search Client..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

  <div className="client-list">

<h2>Clients List</h2>
<p>Total Leads: {clients.length}</p>

{
  clients
  .filter((client) =>
    client.clientName.toLowerCase().includes(search.toLowerCase())
  )
  .map((client, index) => (

  <div className="client-card" key={index}>

    <h3>{client.clientName}</h3>

    <p>{client.email}</p>

    <p>{client.company}</p>

    <p>Source: {client.source}</p>

    <p>Status: {client.status}</p>

    <p>Notes: {client.notes}</p>
    <button onClick={() => handleDelete(index)}>
    Delete
  </button>

  <button onClick={() => handleEdit(index)}>
  Edit
</button>

  </div>
))
}

</div>
      </div>
    </div>
  );
}

export default App;