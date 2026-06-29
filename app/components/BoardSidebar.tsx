"use client";

import { motion } from "framer-motion";
import {
  FileTextIcon,
  ImageIcon,
  LinkIcon,
  ListIcon,
  Trash2Icon,
  StickyNoteIcon,
} from "lucide-react";

interface BoardSidebarProps {
  onAddItem: (type: string) => void;
  onDeleteAll: () => void;
  isBoardEmpty: boolean;
}

export default function BoardSidebar({ onAddItem, onDeleteAll, isBoardEmpty }: BoardSidebarProps) {
  const sidebarItems = [
    { icon: <FileTextIcon size={16} />, label: "Note", type: "note", color: "hover:bg-yellow-50 hover:text-yellow-700" },
    { icon: <LinkIcon size={16} />, label: "Link", type: "link", color: "hover:bg-blue-50 hover:text-blue-700" },
    { icon: <ListIcon size={16} />, label: "To-do", type: "todo", color: "hover:bg-teal-50 hover:text-teal-700" },
    { icon: <ImageIcon size={16} />, label: "Image", type: "image", color: "hover:bg-pink-50 hover:text-pink-700" },
  ];

  return (
    <div className="fixed left-0 top-0 bottom-0 w-14 bg-white border-r border-gray-100 flex flex-col items-center py-4 shadow-sm z-10">
      {/* Logo */}
      <div className="mb-4">
        <StickyNoteIcon className="w-6 h-6 text-teal-500" />
      </div>

      <div className="flex-1 flex flex-col items-center w-full space-y-1 mt-1">
        {sidebarItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full px-2 py-2 flex flex-col items-center justify-center text-gray-500 ${item.color} transition-all duration-150 text-xs rounded-lg mx-1`}
            onClick={() => onAddItem(item.type)}
            title={item.label}
          >
            <div className="mb-1">{item.icon}</div>
            <span className="text-[9px] font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-auto mb-4">
        <motion.button
          whileHover={!isBoardEmpty ? { scale: 1.08 } : {}}
          whileTap={!isBoardEmpty ? { scale: 0.95 } : {}}
          onClick={onDeleteAll}
          disabled={isBoardEmpty}
          className={`w-full px-2 py-2 flex flex-col items-center justify-center ${
            isBoardEmpty ? "opacity-30 cursor-not-allowed text-gray-400" : "text-red-400 hover:bg-red-50 hover:text-red-600"
          } transition-all duration-150 text-xs rounded-lg`}
          title="Clear board"
        >
          <div className="mb-1"><Trash2Icon size={16} /></div>
          <span className="text-[9px] font-medium">Clear</span>
        </motion.button>
      </div>
    </div>
  );
}
