"use client";

import { useState } from "react";
import { Button, Typography, TextField } from "@mui/material";

export default function AuthForm({ fields, title, buttonText, onSubmit }) {
  const initialForm = fields.reduce((acc, field) => {
    acc[field.name] = field.type === "file" ? null : "";
    return acc;
  }, {});
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) =>{
    const {name, type, value, files}=e.target
    if(buttonText="Login" && name=='email'){
      if(value.includes('@')) setForm({ ...form, [name]: value });
      else setForm({ ...form, ['username']: value });
    }
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasFile = Object.values(form).some((v) => v instanceof File);
    if (hasFile) {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });
      onSubmit(data);
    } else {
      onSubmit(form);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 mx-auto mt-20"
      >
        <Typography variant="h4" textAlign="center">
          {title}
        </Typography>
        {fields.map((field) => (
          <div key={field.name}>
            <Typography variant="subtitle2" sx={{marginBottom: 1}}>{field.label}</Typography>
            <TextField
              // label={field.label}
              name={field.name}
              type={field.type || "text"}
              value={field.type === "file" ? undefined : form[field.name] ?? ""}
              onChange={handleChange}
              fullWidth
              required={field.required ?? true}
              slotProps={field.type === "file" ? { accept: "image/*" } : {}}
            />
          </div>
        ))}
        <Button type="submit" variant="contained" sx={{marginTop: 2}}>
          {buttonText}
        </Button>
      </form>
    </>
  );
}
