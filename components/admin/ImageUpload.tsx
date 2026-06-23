"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      const supabase = createClient();

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `news/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("images").getPublicUrl(filePath);

      const publicUrl = data.publicUrl;
      setPreview(publicUrl);
      onChange(publicUrl);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      alert("Erro ao fazer upload da imagem");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Imagem deve ter no máximo 5MB");
        return;
      }
      uploadImage(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative aspect-video rounded-lg overflow-hidden border border-cinza-borda">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-cinza-borda rounded-lg cursor-pointer hover:border-ciano transition-colors">
          <div className="flex flex-col items-center gap-2 p-4">
            <svg className="w-10 h-10 text-cinza-texto/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="text-sm text-cinza-texto text-center">
              {uploading ? (
                <span className="text-ciano">Enviando...</span>
              ) : (
                <>
                  <span className="font-semibold text-ciano">Clique para enviar</span>
                  <br />
                  <span className="text-xs">PNG, JPG até 5MB</span>
                </>
              )}
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
