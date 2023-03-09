import { useState } from "react";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";
import api from "./api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    const userData = users.filter((user) => user._id !== userId);
    setUsers(userData);
  };

  const handleToggleBookmark = (id) => {
    const elementIndex = users.findIndex((elem) => elem._id === id);
    const newBookmark = [...users];
    newBookmark[elementIndex].bookmark = !newBookmark[elementIndex].bookmark;
    setUsers(newBookmark);
  };

  return (
    <div className="App">
      <SearchStatus length={users.length} />
      <Users
        onToggleBookmark={handleToggleBookmark}
        users={users}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
