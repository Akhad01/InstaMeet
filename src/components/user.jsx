import React from "react";
import Bookmark from "./bookmark";
import Qualitie from "./qualitie";

const User = ({
  _id,
  bookmark,
  onDelete,
  name,
  onToggleBookmark,
  qualities,
  profession,
  completedMeetings,
  rate,
}) => {
  return (
    <tr className="mb-2">
      <td>{name}</td>
      <td>
        {qualities.map((quality) => {
          return <Qualitie key={quality._id} {...quality} />;
        })}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <Bookmark onClick={() => onToggleBookmark(_id)} bookmark={bookmark} />
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
