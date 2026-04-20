import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, Plus, Trash2, Image as ImageIcon, Type, ExternalLink, ListPlus } from 'lucide-react';
import { PhonemeContent, SemaforoPair, TallerStep } from '../types';
import { VisualContent } from './VisualContent';

interface DataEditorProps {
  data: PhonemeContent;
  onSave: (newData: PhonemeContent) => void;
  onClose: () => void;
}

export const DataEditor: React.FC<DataEditorProps> = ({ data, onSave, onClose }) => {
  const [editedData, setEditedData] = useState<PhonemeContent>({ ...data });
  const [activeTab, setActiveTab] = useState<'images' | 'pairs' | 'phrases' | 'taller'>('images');
  const [bulkText, setBulkText] = useState('');
  const [showBulk, setShowBulk] = useState(false);

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  const updateGameImage = (index: number, field: 'img' | 'name', value: string) => {
    const newImages = [...editedData.gameImages];
    newImages[index] = { ...newImages[index], [field]: value };
    setEditedData({ ...editedData, gameImages: newImages });
  };

  const addGameImage = () => {
    setEditedData({
      ...editedData,
      gameImages: [...editedData.gameImages, { img: '❓', name: 'NUEVA PALABRA' }]
    });
  };

  const removeGameImage = (index: number) => {
    const newImages = editedData.gameImages.filter((_, i) => i !== index);
    setEditedData({ ...editedData, gameImages: newImages });
  };

  const updateSemaforoPair = (index: number, field: keyof SemaforoPair, value: any) => {
    const newPairs = [...editedData.semaforoPares];
    newPairs[index] = { ...newPairs[index], [field]: value };
    setEditedData({ ...editedData, semaforoPares: newPairs });
  };

  const addSemaforoPair = () => {
    setEditedData({
      ...editedData,
      semaforoPares: [...editedData.semaforoPares, { w1: 'PALABRA 1', s1: 'R suave', i1: '🍐', w2: 'PALABRA 2', s2: 'R fuerte', i2: '🐕', target: 2 }]
    });
  };

  const removeSemaforoPair = (index: number) => {
    const newPairs = editedData.semaforoPares.filter((_, i) => i !== index);
    setEditedData({ ...editedData, semaforoPares: newPairs });
  };

  const handleBulkImport = () => {
    const lines = bulkText.split('\n').filter(line => line.trim() !== '');
    const newImages = lines.map(line => ({
      img: '❓',
      name: line.trim().toUpperCase()
    }));
    setEditedData({
      ...editedData,
      gameImages: [...editedData.gameImages, ...newImages]
    });
    setBulkText('');
    setShowBulk(false);
  };

  const updateTallerStep = (index: number, field: keyof TallerStep, value: string) => {
    const newTaller = [...editedData.taller];
    newTaller[index] = { ...newTaller[index], [field]: value };
    setEditedData({ ...editedData, taller: newTaller });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 border border-zinc-800 w-full max-w-4xl max-h-[90vh] rounded-3xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div>
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Editor de Contenido</h2>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Personalizando: {data.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <X className="w-6 h-6 text-zinc-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800">
          <button 
            onClick={() => setActiveTab('images')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'images' ? 'text-indigo-500 border-b-2 border-indigo-500 bg-indigo-500/5' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Vocabulario
          </button>
          <button 
            onClick={() => setActiveTab('pairs')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'pairs' ? 'text-indigo-500 border-b-2 border-indigo-500 bg-indigo-500/5' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Pares Mínimos
          </button>
          <button 
            onClick={() => setActiveTab('phrases')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'phrases' ? 'text-indigo-500 border-b-2 border-indigo-500 bg-indigo-500/5' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Frases
          </button>
          <button 
            onClick={() => setActiveTab('taller')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'taller' ? 'text-indigo-500 border-b-2 border-indigo-500 bg-indigo-500/5' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Taller
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'images' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold uppercase text-sm tracking-widest">Lista de Palabras ({editedData.gameImages.length})</h3>
                  <a 
                    href="https://arasaac.org/pictograms/search" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] text-indigo-500 hover:underline flex items-center gap-1 mt-1 font-bold uppercase"
                  >
                    <ExternalLink className="w-2 h-2" /> Buscar en ARASAAC
                  </a>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowBulk(!showBulk)}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-300 text-xs font-black rounded-lg hover:bg-zinc-700 transition-colors"
                  >
                    <ListPlus className="w-4 h-4" /> Importar Lista
                  </button>
                  <button 
                    onClick={addGameImage}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-black rounded-lg hover:bg-indigo-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Añadir Palabra
                  </button>
                </div>
              </div>

              {showBulk && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-zinc-800 border border-indigo-500/30 rounded-2xl space-y-3"
                >
                  <p className="text-[10px] text-zinc-400 font-bold uppercase">Pega una lista de palabras (una por línea):</p>
                  <textarea 
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    placeholder="RANA&#10;ROSA&#10;RATÓN..."
                    className="w-full h-32 bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white text-sm outline-none focus:border-indigo-500"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={handleBulkImport}
                      className="flex-1 py-2 bg-indigo-600 text-white text-xs font-black rounded-lg"
                    >
                      Añadir a la lista
                    </button>
                    <button 
                      onClick={() => setShowBulk(false)}
                      className="flex-1 py-2 bg-zinc-700 text-white text-xs font-black rounded-lg"
                    >
                      Cancelar
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {editedData.gameImages.map((item, i) => (
                  <div key={i} className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl flex items-center gap-4 group">
                    <div className="w-16 h-16 bg-zinc-900 rounded-xl flex items-center justify-center relative overflow-hidden border border-zinc-700">
                      <VisualContent content={item.img} alt={item.name} className="w-10 h-10" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 bg-zinc-900 p-2 rounded-lg border border-zinc-700">
                        <ImageIcon className="w-3 h-3 text-zinc-500" />
                        <input 
                          type="text" 
                          value={item.img} 
                          onChange={(e) => updateGameImage(i, 'img', e.target.value)}
                          placeholder="Emoji o URL de ARASAAC"
                          className="bg-transparent text-[10px] text-zinc-300 w-full outline-none font-mono"
                        />
                      </div>
                      <div className="flex items-center gap-2 bg-zinc-900 p-2 rounded-lg border border-zinc-700">
                        <Type className="w-3 h-3 text-zinc-500" />
                        <input 
                          type="text" 
                          value={item.name} 
                          onChange={(e) => updateGameImage(i, 'name', e.target.value)}
                          placeholder="Nombre de la palabra"
                          className="bg-transparent text-xs text-white w-full outline-none font-bold uppercase"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => removeGameImage(i)}
                      className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pairs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold uppercase text-sm tracking-widest">Pares Mínimos ({editedData.semaforoPares.length})</h3>
                <button 
                  onClick={addSemaforoPair}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-black rounded-lg hover:bg-indigo-500 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Añadir Par
                </button>
              </div>
              <div className="space-y-4">
                {editedData.semaforoPares.map((pair, i) => (
                  <div key={i} className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Par #{i + 1}</span>
                      <button onClick={() => removeSemaforoPair(i)} className="text-zinc-600 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Palabra 1 */}
                      <div className="space-y-2 p-3 bg-zinc-900 rounded-xl border border-zinc-700">
                        <p className="text-[8px] font-black text-zinc-500 uppercase">Palabra 1</p>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={pair.w1} 
                            onChange={(e) => updateSemaforoPair(i, 'w1', e.target.value)}
                            className="bg-zinc-800 text-white text-xs p-2 rounded w-full outline-none font-bold uppercase"
                            placeholder="Palabra"
                          />
                          <input 
                            type="text" 
                            value={pair.i1} 
                            onChange={(e) => updateSemaforoPair(i, 'i1', e.target.value)}
                            className="bg-zinc-800 text-white text-xs p-2 rounded w-12 outline-none"
                            placeholder="Picto"
                          />
                        </div>
                        <input 
                          type="text" 
                          value={pair.s1} 
                          onChange={(e) => updateSemaforoPair(i, 's1', e.target.value)}
                          className="bg-zinc-800 text-zinc-400 text-[10px] p-2 rounded w-full outline-none"
                          placeholder="Descripción (ej: R suave)"
                        />
                      </div>
                      {/* Palabra 2 */}
                      <div className="space-y-2 p-3 bg-zinc-900 rounded-xl border border-zinc-700">
                        <p className="text-[8px] font-black text-zinc-500 uppercase">Palabra 2</p>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={pair.w2} 
                            onChange={(e) => updateSemaforoPair(i, 'w2', e.target.value)}
                            className="bg-zinc-800 text-white text-xs p-2 rounded w-full outline-none font-bold uppercase"
                            placeholder="Palabra"
                          />
                          <input 
                            type="text" 
                            value={pair.i2} 
                            onChange={(e) => updateSemaforoPair(i, 'i2', e.target.value)}
                            className="bg-zinc-800 text-white text-xs p-2 rounded w-12 outline-none"
                            placeholder="Picto"
                          />
                        </div>
                        <input 
                          type="text" 
                          value={pair.s2} 
                          onChange={(e) => updateSemaforoPair(i, 's2', e.target.value)}
                          className="bg-zinc-800 text-zinc-400 text-[10px] p-2 rounded w-full outline-none"
                          placeholder="Descripción (ej: R fuerte)"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase">¿Cuál es la correcta?</p>
                      <div className="flex gap-2">
                        {[1, 2].map(num => (
                          <button
                            key={num}
                            onClick={() => updateSemaforoPair(i, 'target', num)}
                            className={`px-4 py-1 rounded-full text-[10px] font-black uppercase transition-all ${pair.target === num ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}
                          >
                            Palabra {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'phrases' && (
            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase text-sm tracking-widest">Frases del Fonema</h3>
              {editedData.pistaFrases.map((phrase, i) => (
                <div key={i} className="flex gap-2">
                  <textarea 
                    value={phrase}
                    onChange={(e) => {
                      const newPhrases = [...editedData.pistaFrases];
                      newPhrases[i] = e.target.value;
                      setEditedData({ ...editedData, pistaFrases: newPhrases });
                    }}
                    className="flex-1 bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-white text-sm outline-none focus:border-indigo-500 transition-colors min-h-[80px]"
                  />
                  <button 
                    onClick={() => {
                      const newPhrases = editedData.pistaFrases.filter((_, idx) => idx !== i);
                      setEditedData({ ...editedData, pistaFrases: newPhrases });
                    }}
                    className="p-3 bg-zinc-800 text-zinc-500 hover:text-red-500 rounded-xl self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => setEditedData({ ...editedData, pistaFrases: [...editedData.pistaFrases, 'Nueva frase para practicar...'] })}
                className="w-full py-4 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500 font-bold hover:bg-zinc-800/50 transition-all"
              >
                + Añadir Frase
              </button>
            </div>
          )}
          {activeTab === 'taller' && (
            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase text-sm tracking-widest">Pasos del Taller</h3>
              <div className="space-y-4">
                {editedData.taller.map((step, i) => (
                  <div key={i} className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-[8px] font-black text-zinc-500 uppercase">Título</p>
                        <input 
                          type="text" 
                          value={step.title} 
                          onChange={(e) => updateTallerStep(i, 'title', e.target.value)}
                          className="bg-zinc-900 border border-zinc-700 text-white text-xs p-3 rounded-xl w-full outline-none font-bold uppercase"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-[8px] font-black text-zinc-500 uppercase">Sonido/Onomatopeya</p>
                        <input 
                          type="text" 
                          value={step.sound} 
                          onChange={(e) => updateTallerStep(i, 'sound', e.target.value)}
                          className="bg-zinc-900 border border-zinc-700 text-indigo-500 text-xs p-3 rounded-xl w-full outline-none font-black italic"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[8px] font-black text-zinc-500 uppercase">Instrucción</p>
                      <textarea 
                        value={step.instruction} 
                        onChange={(e) => updateTallerStep(i, 'instruction', e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs p-3 rounded-xl w-full outline-none min-h-[60px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[8px] font-black text-zinc-500 uppercase">Consejo (Tip)</p>
                      <input 
                        type="text" 
                        value={step.tip} 
                        onChange={(e) => updateTallerStep(i, 'tip', e.target.value)}
                        className="bg-zinc-900 border border-zinc-700 text-zinc-400 text-[10px] p-3 rounded-xl w-full outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-zinc-800 text-zinc-400 font-bold rounded-2xl uppercase text-xs tracking-widest hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl uppercase text-xs tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Guardar Cambios
          </button>
        </div>
      </motion.div>
    </div>
  );
};
