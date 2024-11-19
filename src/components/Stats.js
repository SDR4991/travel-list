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

export default Stats;
