"use client";

import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { addPost } from "../api/posts";
import { AuthContext } from "../contexts/AuthContext";

export default function AddPost() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("lifestyle");
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitleError(false);
    setBodyError(false);

    if (!title || title === "") {
      setTitleError(true);
    }

    if (!body || body === "") {
      setBodyError(true);
    }

    if (title !== "" && body !== "") {
      const response = await addPost({
        title,
        body,
        category,
        author:
          user?.firstName.toLowerCase() + "-" + user?.lastName.toLowerCase(),
      });

      if (response?.status === 201) {
        navigate("/");
      }
    }
  };

  return (
    <Container>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Create A New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          sx={{ my: 1 }}
          required
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
          error={titleError}
        />
        <TextField
          label="Body"
          variant="outlined"
          sx={{ my: 1 }}
          multiline
          rows={4}
          required
          fullWidth
          onChange={(e) => setBody(e.target.value)}
          error={bodyError}
        />
        <FormControl sx={{ my: 1 }} fullWidth>
          <FormLabel>Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              value="lifestyle"
              control={<Radio />}
              label="Lifestyle"
            />
            <FormControlLabel
              value="business"
              control={<Radio />}
              label="Business"
            />
            <FormControlLabel
              value="politics"
              control={<Radio />}
              label="Politics"
            />
            <FormControlLabel
              value="sports"
              control={<Radio />}
              label="Sports"
            />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          endIcon={<KeyboardArrowRightIcon />}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
