import React, { useState } from "react";

const App = () => {
  const [items, setItems] = useState([]);

  const handleSetItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItems = (id) => {
    setItems(() => items.filter((item) => item.id !== id));
  };

  const handlePacked = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleSetItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggle={handlePacked}
      />
      <Stats items={items} />
    </div>
  );
};

const Logo = () => {
  return <h1>🌴Far away💼 </h1>;
};

const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
    console.log(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

const PackingList = ({ items, onDeleteItems, onToggle }) => {
  const [sortedBy, setSortedBy] = useState("description");

  let sortedItems;

  if (sortedBy === "input") sortedItems = items;
  if (sortedBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortedBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggle={onToggle}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortedBy} onChange={(e) => setSortedBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
      </div>
    </div>
  );
};

const Item = ({ item, onDeleteItems, onToggle }) => {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggle(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
};

const Stats = ({ items }) => {
  if (!items.length) return;
  <p className="stats">
    {" "}
    <em>Start to add some items to your list 🚀</em>
  </p>;
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numItems / numPacked) * 100);

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em> You got everything! Ready to go ✈️ </em>
      ) : (
        <em>
          💼 You have {numItems} items on your list, and you already packed{" "}
          {numPacked} ({typeof (percentage === isNaN) ? 0 : percentage}%)
        </em>
      )}
    </footer>
  );
};

export default App;
