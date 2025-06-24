import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset? : () => void;
  onApply? : (option : string) => void;
}

const dataOption = [
    {id : "title", option : "Title"},
    {id : "publisher", option : "Publisher"},
    {id : "year", option : "Year"},
    {id : "pages", option : "Pages"},
]

const FilterModal = ({ isOpen, onClose, onApply, onReset }: ModalProps) => {
    const [selectedOpt, setSelectedOpt] = useState('');
    if (!isOpen) return null;

    const handleApply = () => {
      if (selectedOpt && onApply) {
      onApply(selectedOpt);
    }
    onClose();
    }

    const handleReset = () => {
      setSelectedOpt('');
      if (onReset) {
        onReset();
      }
      onClose();
    }
  return (
    <div 
      className="fixed top-0 z-50 inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-neutral-900 rounded-lg shadow-2xl border border-gray-200 dark:border-neutral-700 w-full max-w-md transform transition-all duration-300 animate-slideUp" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-neutral-700">
          <h1 className="text-xl font-mono font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <CiFilter className="text-blue-600 dark:text-blue-400" size={24}/>
            Sort By
          </h1>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200"
          >
            <IoClose size={24} className="text-gray-500 dark:text-gray-400"/>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {dataOption.map((item) => (
            <div key={item.id} className="flex items-center gap-3 group">
              <input 
                type="radio" 
                id={item.id}
                value={item.id}
                name="sort-option"
                checked={selectedOpt === item.id}
                onChange={(event) => setSelectedOpt(event.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
              />
              <label 
                htmlFor={item.id}
                className="text-neutral-800 font-mono font-semibold dark:text-white cursor-pointer select-none group-hover:text-blue-600 transition-colors duration-200"
              >
                {item.option}
              </label>
            </div>
          ))}

          <div className="border-t border-gray-200 dark:border-neutral-700 pt-4 mt-6">
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Clear Selection
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50 rounded-b-lg">
          <button 
            onClick={onClose}
            className="px-4 py-2 font-mono text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleApply}
            className="px-6 py-2 font-mono bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Apply
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default FilterModal;