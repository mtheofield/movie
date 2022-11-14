import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_STOCK } from "../queries/stockQueries";
import { UPDATE_STOCK } from "../mutations/stockMutations";

export default function EditStockForm({ stock }) {
  const [name, setName] = useState(stock.name);
  const [description, setDescription] = useState(stock.description);
  const [status, setStatus] = useState(() => {
    switch (stock.status) {
      case "Not In":
        return "new";
      case "In Stock":
        return "progress";
      case "Finished":
        return "finished";
      default:
        throw new Error(`Unknown status: ${stock.status}`);
    }
  });

  const [updateStock] = useMutation(UPDATE_STOCK, {
    variables: { id: stock.id, name, description, status },
    refetchQueries: [{ query: GET_STOCK, variables: { id: stock.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("Please fill out all fields");
    }

    updateStock(name, description, status);
  };

  return (
    <div className="mt-5">
      <h3>Update Stock Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not In</option>
            <option value="progress">In Stock</option>
            <option value="finished">Finished</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
