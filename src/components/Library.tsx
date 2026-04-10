import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Upload, File as FileIcon, X, Check, Eye, RotateCcw } from 'lucide-react';

interface LibraryProps {
  resources: any[];
  userResources: any[];
  onUpload: (resource: { title: string, date: string, data?: string }) => void;
  onDeleteUserResource: (index: number) => void;
}

export const Library: React.FC<LibraryProps> = ({ resources, userResources, onUpload, onDeleteUserResource }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const processFile = (file: File) => {
    setIsUploading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const data = e.target?.result as string;
      const isTooLarge = data.length >= 2 * 1024 * 1024;
      
      onUpload({
        title: file.name,
        date: new Date().toISOString(),
        data: isTooLarge ? undefined : data
      });

      if (isTooLarge) {
        alert("El archivo es demasiado grande para guardarlo permanentemente (>2MB). Solo se guardará el nombre.");
      }
      
      setIsUploading(false);
    };

    reader.onerror = () => {
      alert("Error al leer el archivo");
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <motion.div 
      key="library"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 pb-12"
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Biblioteca del Piloto</h3>
        <p className="text-zinc-400 text-lg">
          Consulta materiales, libros y guías para complementar tu entrenamiento fuera de la pista.
        </p>
      </div>

      {/* Upload Area */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-10 border-2 border-dashed rounded-3xl transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${
          isDragging 
            ? 'border-red-500 bg-red-500/10 scale-[1.02]' 
            : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept=".pdf,.doc,.docx,image/*"
        />
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${isDragging || isUploading ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
          {isUploading ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <RotateCcw className="w-8 h-8" />
            </motion.div>
          ) : (
            <Upload className="w-8 h-8" />
          )}
        </div>
        <div className="text-center">
          <p className="text-white font-bold text-lg">{isUploading ? 'Procesando archivo...' : 'Sube tu propio material'}</p>
          <p className="text-zinc-500 text-sm">Arrastra tus PDFs o haz clic para seleccionar archivos</p>
        </div>
      </div>

      {/* User Resources */}
      {(userResources || []).length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-black text-zinc-500 uppercase tracking-[0.2em] italic">Mis Materiales ({(userResources || []).length})</h4>
          <div className="grid grid-cols-1 gap-4">
            {(userResources || []).map((res, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={`user-res-${idx}`}
                className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between group hover:border-red-500/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500">
                    <FileIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Archivo Local</span>
                      <h4 className="text-lg font-bold text-white uppercase italic tracking-tight truncate max-w-[200px] sm:max-w-md">{res.title}</h4>
                    </div>
                    <p className="text-zinc-500 text-sm">Subido el {new Date(res.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {res.data && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const win = window.open();
                        if (win) {
                          win.document.write(`<iframe src="${res.data}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                        }
                      }}
                      className="p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-all"
                      title="Ver"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteUserResource(idx);
                    }}
                    className="p-3 bg-zinc-800 hover:bg-red-600 text-white rounded-xl transition-all"
                    title="Eliminar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Default Resources */}
      <div className="space-y-4">
        <h4 className="text-sm font-black text-zinc-500 uppercase tracking-[0.2em] italic">Recursos Recomendados</h4>
        <div className="grid grid-cols-1 gap-4">
          {(resources || []).map((res, idx) => (
            <div 
              key={idx}
              className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between group hover:border-red-500/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                  {res.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{res.type}</span>
                    <h4 className="text-lg font-bold text-white uppercase italic tracking-tight">{res.title}</h4>
                  </div>
                  <p className="text-zinc-500 text-sm">{res.desc}</p>
                </div>
              </div>
              <button 
                onClick={() => alert('Aquí se abriría el enlace al recurso: ' + res.title)}
                className="p-3 bg-zinc-800 hover:bg-red-600 text-white rounded-xl transition-all"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Check className="w-32 h-32" />
        </div>
        <h4 className="text-xl font-black text-white uppercase italic">¿Necesitas más ayuda?</h4>
        <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
          Si tienes problemas para subir tus archivos o necesitas material específico para un fonema, 
          puedes contactar con tu logopeda para que te asigne tareas personalizadas.
        </p>
      </div>
    </motion.div>
  );
};
