import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    const userData = users.filter((user) => user._id !== userId);
    setUsers(userData);
  };

  const renderPhrase = () => {
    const world =
      users.length >= 2 && users.length <= 4
        ? "человека тусанут"
        : "человек тусанет";

    return users.length > 0 ? (
      <span className="badge bg-primary">
        {`${users.length} ${world} с тобой сегодня`}
      </span>
    ) : (
      <span className="badge bg-danger">Никто с тобой не тусанет</span>
    );
  };

  return (
    <>
      <h2>{renderPhrase()}</h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr className="mb-2" key={user._id}>
                  <td>{user.name}</td>
                  <td>
                    {user.qualities.map((quality) => {
                      return (
                        <span
                          key={quality._id}
                          className={`badge bg-${quality.color} m-1`}
                        >
                          {quality.name}
                        </span>
                      );
                    })}
                  </td>
                  <td>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate}/5</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
