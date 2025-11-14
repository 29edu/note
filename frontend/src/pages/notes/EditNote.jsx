import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById, updateNote } from "../../services/noteService";
import Navbar from "../../components/Navbar";

function EditNote() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetching Note on mount

  useEffect(() => {
    fetchNote();
  }, [id]);

  const fetchNote = async () => {
    
  };
}
