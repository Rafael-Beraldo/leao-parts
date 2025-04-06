import { useState } from "react";

import "../styles/ProductForm.css";

import { toast } from "react-toastify";

import Footer from "../components/Footer";
import Header from "../components/Header";

import { supabase } from "../services/supabaseClient";

const uploadImage = async (file: File): Promise<string | null> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `public/${fileName}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file);

  if (error) {
    console.error("Erro ao fazer upload da imagem:", error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
};

export default function ProductForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = "";

    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (!uploadedUrl) {
        alert("Erro ao fazer upload da imagem.");
        return;
      }
      imageUrl = uploadedUrl;
    }

    const { error } = await supabase.from("products").insert([
      {
        name,
        description,
        price: price,
        category: category,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      console.error("Erro ao salvar produto:", error.message);
      toast.error("Erro ao salvar o produto.");
    } else {
      toast.success("Produto cadastrado com sucesso!");
      setName("");
      setCategory("");
      setDescription("");
      setPrice(0);
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Header />
      <div className="product-form-container">
        <h2>Cadastrar Produto</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <input
            type="text"
            placeholder="Nome do Produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Marca"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />

          <label className="file-label">
            Selecionar imagem
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              hidden
            />
          </label>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Pré-visualização" />
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                }}
              >
                Remover imagem
              </button>
            </div>
          )}

          <button className="buttonRegister" type="submit">
            Cadastrar
          </button>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>
      <Footer />
    </div>
  );
}
